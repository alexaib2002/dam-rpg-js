export class BattleEntity {

    constructor(name, health, attacks, defend) {
        this.name = name;
        this.health = health;
        this.attacks = attacks;
        this.defend = defend;
    }

    

    destroy() {
        // TODO Virtual method
    }

}