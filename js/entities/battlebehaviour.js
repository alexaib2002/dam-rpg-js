
const GAME_OVER = 1;
const GAME_WIN = 0;

function attack(attacker, defender) {
    
    // if the defender is dead, notify defender is dead and return GAME_WIN

    if (defender.health <= 0) {
        console.log(`${defender.name} is dead!`);
        return GAME_WIN;
    }
    // if the attacker is dead, notify attacker is dead and return GAME_OVER
    if (attacker.health <= 0) {
        console.log(`${attacker.name} is dead!`);
        return GAME_OVER;

    }
    // if the attacker is not dead, attack the defender
    defender.health -= attacker.attacks;
    // if the defender is dead, return GAME_WIN
    if (defender.health <= 0) {
        console.log(`${defender.name} is dead!`);
        return GAME_WIN;
    }
    // if the defender is not dead, attack the attacker
    attacker.health -= defender.attacks;
};

function defend(attacker, defender) {
   
    if (defender.health <= 0) {
        console.log(`${defender.name} is dead!`);
        return GAME_WIN;
    }
    
    if (attacker.health <= 0) {
        console.log(`${attacker.name} is dead!`);
        return GAME_OVER;

    }
    // if the attacker is not dead, defend the defender
    defender.health -= attacker.defend;
    // if the defender is dead, return GAME_WIN
    if (defender.health <= 0) {
        console.log(`${defender.name} is dead!`);
        return GAME_WIN;
    }
    // if the defender is not dead, defend the attacker
    attacker.health -= defender.defend;
};


function healthRecover(attacker, defender) {
   
    if (defender.health <= 0) {
        console.log(`${defender.name} is dead!`);
        return GAME_WIN;
    }
   
    if (attacker.health <= 0) {
        console.log(`${attacker.name} is dead!`);
        return GAME_OVER;

    }

    // if the attacker is not dead, recover the defender
    defender.health += attacker.healthRecover;
    // if the defender is dead, return GAME_WIN
    if (defender.health <= 0) {
        console.log(`${defender.name} is dead!`);
        return GAME_WIN;
    }
    // if the defender is not dead, recover the attacker
    attacker.health += defender.healthRecover;

};


function escape() {
    // TODO 
};
