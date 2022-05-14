
const GAME_OVER = 1;
const GAME_WIN = 0;

function attack(player, enemy) {
    // if the enemy is dead, notify enemy is dead and return GAME_WIN

    if (enemy.health <= 0) {
        console.log(`${enemy.name} is dead!`);
        return GAME_WIN;
    }
    // if the player is dead, notify player is dead and return GAME_OVER
    if (player.health <= 0) {
        console.log(`${player.name} is dead!`);
        return GAME_OVER;

    }
    // if the player is not dead, attack the enemy
    enemy.health -= player.attacks;
    // if the enemy is dead, return GAME_WIN
    if (enemy.health <= 0) {
        console.log(`${enemy.name} is dead!`);
        return GAME_WIN;
    }
    // if the enemy is not dead, attack the player
    player.health -= enemy.attacks;
}


