// UI RENDERER & TYPEWRITER ANIMATION
import { heroSvg, enemyHoundSvg, enemyBossSvg } from './sprites.js';

export class UIRenderer {
    constructor(soundEngine) {
        this.sound = soundEngine;
        this.typewriterInterval = null;
        this.isTyping = false;
        this.fullText = "";
    }

    initSprites() {
        document.getElementById('hero-sprite-container').innerHTML = heroSvg;
    }

    renderHUD(state) {
        document.getElementById('txt-hp').textContent = `${state.hp}/${state.maxHp}`;
        document.getElementById('bar-hp').style.width = `${(state.hp / state.maxHp) * 100}%`;

        document.getElementById('txt-mp').textContent = `${state.mp}/${state.maxMp}`;
        document.getElementById('bar-mp').style.width = `${(state.mp / state.maxMp) * 100}%`;

        document.getElementById('badge-inv-count').textContent = state.inventory.length;
        document.getElementById('txt-gold').textContent = state.gold;

        document.getElementById('stat-hp').textContent = `${state.hp} / ${state.maxHp}`;
        document.getElementById('stat-mp').textContent = `${state.mp} / ${state.maxMp}`;
        document.getElementById('stat-sanity').textContent = `${state.sanity}%`;
        document.getElementById('stat-atk').textContent = state.atk;
        document.getElementById('stat-def').textContent = state.def;
    }

    renderEnemySprite(enemyType) {
        const container = document.getElementById('enemy-sprite-container');
        if (!enemyType) {
            container.classList.add('hidden');
            container.innerHTML = '';
            return;
        }

        container.classList.remove('hidden');
        if (enemyType === 'hound') container.innerHTML = enemyHoundSvg;
        if (enemyType === 'boss') container.innerHTML = enemyBossSvg;
    }

    typeText(speaker, text, onComplete) {
        const speakerEl = document.getElementById('txt-speaker');
        const dialogueEl = document.getElementById('txt-dialogue');
        
        speakerEl.textContent = speaker;
        dialogueEl.textContent = '';
        this.fullText = text;
        this.isTyping = true;

        let index = 0;
        clearInterval(this.typewriterInterval);

        this.typewriterInterval = setInterval(() => {
            if (index < text.length) {
                dialogueEl.textContent += text.charAt(index);
                if (index % 3 === 0) this.sound.playTypewriter();
                index++;
            } else {
                clearInterval(this.typewriterInterval);
                this.isTyping = false;
                if (onComplete) onComplete();
            }
        }, 22);
    }

    skipTypewriter() {
        if (this.isTyping) {
            clearInterval(this.typewriterInterval);
            document.getElementById('txt-dialogue').textContent = this.fullText;
            this.isTyping = false;
        }
    }

    spawnFloatingText(text, isHeal = false) {
        const container = document.getElementById('floating-text-container');
        const el = document.createElement('div');
        el.className = `floating-dmg ${isHeal ? 'floating-heal' : ''}`;
        el.textContent = text;
        
        el.style.left = `${50 + (Math.random() * 20 - 10)}%`;
        el.style.top = `${40 + (Math.random() * 20 - 10)}%`;

        container.appendChild(el);
        setTimeout(() => el.remove(), 800);
    }
}
