export class BattleEntity {

    constructor(definition, defense) {
        this.name = definition.name;
        this.health = definition.health;
        this.attacks = definition.attacks;
        this.defense = defense;
        this.hasProtection = false;
    }


    destroy() {
        // TODO Virtual method
    }

}
export default BattleEntity;