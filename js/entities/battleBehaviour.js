
const MAX_DAMAGE = 300;
const MIN_DAMAGE = 0;
const HEALTH_RECOVER = 10;
const DEFENSE_PROTECTION = 5;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);


class BattleBehaviours {
    attack(attacker, defender) {
        let damage = attacker.attackDamageValue - defender.defenseDamageValue;
        console.log(`Attacker attack: ${attacker.attackDamageValue} and defender defense: ${defender.defenseDamageValue}`);
        console.log(`Raw damage is ${damage}`);
        if (defender.hasProtection) {
            console.log(`${defender.name} has protection`);
            damage -= DEFENSE_PROTECTION
        }
        defender.health = clamp(
                defender.health - clamp(damage, MIN_DAMAGE, MAX_DAMAGE),
                defender.minHealth,
                defender.maxHealth
        );
        if (defender.health <= 0) {
            console.log(`${defender.name} is dead!`);
            return attacker;
        }
        defender.hasProtection = false;
        console.log(`${attacker.name} attacked ${defender.name} for ${damage} damage`);
    };

    defend(entity) {
        console.log(`${entity.name} is defending`);
        entity.hasProtection = true;
    };


    healthRecover(entity) {
        entity.health = clamp(entity.health + HEALTH_RECOVER, entity.minHealth, entity.maxHealth);
        console.log(`${entity.name} recovered ${HEALTH_RECOVER} health`);
    };


    flee() {
        // TODO
        console.log("flee not implemented yet");
    };
}

export default BattleBehaviours;