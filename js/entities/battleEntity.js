export class BattleEntity {

    maxHealth = 100;
    minHealth = 0;
    attackDamageValue = 0;
    defenseDamageValue = 0;

    constructor(definition) {
        this.name = definition.name;
        this.health = definition.health;
        this.attacks = definition.attacks;
        this.sprite = definition.sprite;
        this.defenseDamageValue = definition.defenseval;
        this.hasProtection = false;
    }

    // virtual methods, require implementation on their own instances

    attack() {
        console.log("attack not implemented on this entity");
    }

    defend() {
        console.log("defend not implemented on this entity");
    }

    recover() {
        console.log("recover not implemented on this entity");
    }

    flee() {
        console.log("flee not implemented yet");
    }

}
export default BattleEntity;