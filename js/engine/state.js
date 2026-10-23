// GAME STATE MANAGEMENT & STORAGE
export class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        this.heroName = "Cipher";
        this.hp = 100;
        this.maxHp = 100;
        this.mp = 50;
        this.maxMp = 50;
        this.sanity = 100;
        this.maxSanity = 100;
        this.atk = 15;
        this.def = 5;
        this.gold = 30;

        this.weapon = { name: 'Bilah Arcane Tumpul', atk: 5 };
        this.armor = { name: 'Jubah Inisiat', def: 2 };

        this.inventory = [
            { id: 'potion_hp', name: 'Ramuan HP', desc: 'Pulihkan 40 HP' }
        ];

        this.currentNodeId = 'start';
        this.inCombat = false;
        this.currentEnemy = null;
    }

    restoreHp(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    restoreMp(amount) {
        this.mp = Math.min(this.maxMp, this.mp + amount);
    }

    takeDamage(amount) {
        const actualDmg = Math.max(1, amount - this.def);
        this.hp = Math.max(0, this.hp - actualDmg);
        return actualDmg;
    }

    addItem(item) {
        this.inventory.push(item);
    }

    useItem(index) {
        const item = this.inventory[index];
        if (!item) return false;

        if (item.id === 'potion_hp') {
            this.restoreHp(40);
            this.inventory.splice(index, 1);
            return true;
        }
        return false;
    }

    saveToLocalStorage() {
        const data = {
            hp: this.hp,
            maxHp: this.maxHp,
            mp: this.mp,
            maxMp: this.maxMp,
            atk: this.atk,
            def: this.def,
            gold: this.gold,
            inventory: this.inventory,
            currentNodeId: this.currentNodeId
        };
        localStorage.setItem('cipherbound_save', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const raw = localStorage.getItem('cipherbound_save');
        if (!raw) return false;
        try {
            const data = JSON.parse(raw);
            Object.assign(this, data);
            return true;
        } catch (e) {
            return false;
        }
    }
}
