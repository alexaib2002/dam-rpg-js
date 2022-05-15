export class BattleEntity {

    constructor(definition, defend) {
        this.name = definition.name;
        this.health = definition.health;
        this.attacks = definition.attacks;
        this.defend = defend;
    }


    destroy() {
        // TODO Virtual method
    }

}
export default BattleEntity;