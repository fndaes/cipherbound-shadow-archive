// MAIN APPLICATION BOOTSTRAPPER & FSM LOGIC
import { GameState } from './engine/state.js';
import { SoundEngine } from './engine/audio.js';
import { BackgroundCanvas } from './ui/canvas.js';
import { UIRenderer } from './ui/renderer.js';
import { storyNodes, enemiesData } from './data/storyData.js';

class App {
    constructor() {
        this.state = new GameState();
        this.sound = new SoundEngine();
        this.canvas = new BackgroundCanvas('bg-canvas');
        this.ui = new UIRenderer(this.sound);

        this.initEvents();
        this.ui.initSprites();
        this.loadNode('start');
    }

    initEvents() {
        document.body.addEventListener('click', () => this.sound.init(), { once: true });

        document.getElementById('btn-char-modal').onclick = () => this.toggleModal('modal-character', true);
        document.getElementById('btn-close-character').onclick = () => this.toggleModal('modal-character', false);

        document.getElementById('btn-inventory-drawer').onclick = () => this.toggleDrawer('drawer-inventory', true);
        document.getElementById('btn-close-inventory').onclick = () => this.toggleDrawer('drawer-inventory', false);

        document.getElementById('btn-menu-modal').onclick = () => this.toggleModal('modal-menu', true);
        document.getElementById('btn-close-menu').onclick = () => this.toggleModal('modal-menu', false);

        document.getElementById('btn-open-tech').onclick = () => {
            this.toggleModal('modal-menu', false);
            this.toggleModal('modal-tech', true);
        };
        document.getElementById('btn-close-tech').onclick = () => this.toggleModal('modal-tech', false);

        document.getElementById('backdrop').onclick = () => this.closeAllOverlays();

        document.getElementById('btn-save-game').onclick = () => {
            this.state.saveToLocalStorage();
            alert('Progres berhasil disimpan!');
            this.toggleModal('modal-menu', false);
        };

        document.getElementById('btn-load-game').onclick = () => {
            if (this.state.loadFromLocalStorage()) {
                alert('Progres berhasil dimuat!');
                this.toggleModal('modal-menu', false);
                this.loadNode(this.state.currentNodeId);
            } else {
                alert('Tidak ada simpanan ditemukan.');
            }
        };

        document.getElementById('btn-restart-game').onclick = () => {
            this.state.reset();
            this.toggleModal('modal-menu', false);
            this.loadNode('start');
        };

        document.getElementById('dialogue-body').onclick = () => this.ui.skipTypewriter();
    }

    toggleModal(modalId, show) {
        this.sound.playClick();
        const modal = document.getElementById(modalId);
        const backdrop = document.getElementById('backdrop');

        if (show) {
            modal.classList.remove('hidden');
            backdrop.classList.remove('hidden');
        } else {
            modal.classList.add('hidden');
            backdrop.classList.add('hidden');
        }
    }

    toggleDrawer(drawerId, show) {
        this.sound.playClick();
        const drawer = document.getElementById(drawerId);
        const backdrop = document.getElementById('backdrop');

        if (show) {
            this.renderInventoryGrid();
            drawer.classList.add('open');
            backdrop.classList.remove('hidden');
        } else {
            drawer.classList.remove('open');
            backdrop.classList.add('hidden');
        }
    }

    closeAllOverlays() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.drawer').forEach(d => d.classList.remove('open'));
        document.getElementById('backdrop').classList.add('hidden');
    }

    renderInventoryGrid() {
        const grid = document.getElementById('inventory-grid');
        grid.innerHTML = '';
        this.state.inventory.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'inv-item-card';
            card.innerHTML = `<strong>${item.name}</strong><small>${item.desc}</small>`;
            card.onclick = () => {
                if (this.state.useItem(index)) {
                    this.sound.playMagic();
                    this.ui.spawnFloatingText('+40 HP', true);
                    this.ui.renderHUD(this.state);
                    this.renderInventoryGrid();
                }
            };
            grid.appendChild(card);
        });
    }

    loadNode(nodeId) {
        const node = storyNodes[nodeId];
        if (!node) return;

        this.state.currentNodeId = nodeId;
        if (node.onEnter) node.onEnter(this.state);

        this.ui.renderHUD(this.state);
        this.canvas.setTheme(node.bgTheme || 'archive');
        document.getElementById('txt-location').textContent = node.location;

        this.ui.typeText(node.speaker, node.text, () => {
            this.renderChoices(node.choices);
        });
    }

    renderChoices(choices) {
        const container = document.getElementById('choices-container');
        container.innerHTML = '';

        choices.forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `<span>${c.text}</span> <span>➔</span>`;
            btn.onclick = () => {
                this.sound.playClick();
                if (c.startCombat) {
                    this.startCombat(c.startCombat);
                } else if (c.restart) {
                    this.state.reset();
                    this.loadNode('start');
                } else if (c.nextNode) {
                    this.loadNode(c.nextNode);
                }
            };
            container.appendChild(btn);
        });
    }

    startCombat(enemyId) {
        const enemy = { ...enemiesData[enemyId] };
        this.state.inCombat = true;
        this.ui.renderEnemySprite(enemy.svgType);
        
        this.canvas.setTheme('boss');
        this.ui.typeText('Sistem Pertarungan', `Pertarungan dimulai melawan ${enemy.name}!`, () => {
            this.renderCombatChoices(enemy);
        });
    }

    renderCombatChoices(enemy) {
        const choices = [
            {
                text: `⚔️ Serang dengan Bilah (${this.state.atk} ATK)`,
                action: () => this.executeCombatTurn(enemy, 'attack')
            },
            {
                text: '✨ Gunakan Sihir Arcane Bolt (-15 MP)',
                action: () => this.executeCombatTurn(enemy, 'magic')
            }
        ];

        const container = document.getElementById('choices-container');
        container.innerHTML = '';

        choices.forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerHTML = `<span>${c.text}</span>`;
            btn.onclick = () => {
                this.sound.playClick();
                c.action();
            };
            container.appendChild(btn);
        });
    }

    executeCombatTurn(enemy, actionType) {
        let playerDmg = 0;

        if (actionType === 'attack') {
            this.sound.playSlash();
            playerDmg = Math.max(1, this.state.atk - enemy.def + Math.floor(Math.random() * 4));
            enemy.hp = Math.max(0, enemy.hp - playerDmg);
            this.ui.spawnFloatingText(`-${playerDmg} HP`);
        } else if (actionType === 'magic') {
            if (this.state.mp < 15) {
                alert('MP tidak cukup!');
                return;
            }
            this.state.mp -= 15;
            this.sound.playMagic();
            playerDmg = 35 + Math.floor(Math.random() * 10);
            enemy.hp = Math.max(0, enemy.hp - playerDmg);
            this.ui.spawnFloatingText(`-${playerDmg} HP`);
        }

        this.ui.renderHUD(this.state);

        if (enemy.hp <= 0) {
            this.ui.renderEnemySprite(null);
            this.state.inCombat = false;
            this.ui.typeText('Kemenangan!', `Kamu berhasil mengalahkan ${enemy.name}!`, () => {
                this.loadNode(enemy.victoryNode);
            });
            return;
        }

        const enemyDmg = this.state.takeDamage(enemy.atk);
        this.ui.renderHUD(this.state);

        if (this.state.hp <= 0) {
            this.ui.typeText('Kekalahan', 'HP milikmu telah habis... Kesadaranmu pudar.', () => {
                this.renderChoices([{ text: '🔄 Coba Lagi', restart: true }]);
            });
            return;
        }

        this.ui.typeText('Langkah Bertarung', `Kamu menyerahkan ${playerDmg} damage! ${enemy.name} membalas dengan ${enemyDmg} damage!`, () => {
            this.renderCombatChoices(enemy);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new App();
});
