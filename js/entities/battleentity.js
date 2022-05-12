export class BattleEntity {

    constructor(name, health, attacks) {
        this.name = name;
        this.health = health;
        this.attacks = attacks;
    }

    destroy() {
        // TODO Virtual method
    }

}