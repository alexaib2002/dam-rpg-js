import * as me from "https://esm.run/melonjs";
import gameController from "/index.js";
import { battleController } from "/js/screens/battle.js";
import BattleEntity from "/js/entities/battleEntity.js";

export default class Player extends BattleEntity {
    constructor() {
        super(
            {
                name: "PlayerName",
                health: 100,
                attacks: {
                    "std_attack": { // FIXME hardcoded value
                        "name": "Standard Attack",
                        "description": "You attack!!",
                        "damage": "15"
                    }
                },
                sprite: "player",
                defenseval: "10"
            }
        );
        this.level = 1;
        this.exp = 0;
        this.pos = {
            x: 0,
            y: 0
        }
    }

    attack() {
        gameController.player.attackDamageValue = gameController.player.attacks.std_attack.damage; // FIXME hardcoded
        let attackResult = battleController.battleBehaviours.attack(
            gameController.player, gameController.enemy
        );
        if (attackResult != null) {
            console.log(`Battle controller: You defeated ${attackResult.name}`);
            me.state.change(gameController.STATE_END, "Player won");
        }
    }

    defense() {
        battleController.battleBehaviours.defend(
            gameController.player
        );
    }
    recover() {
        battleController.battleBehaviours.healthRecover(
            gameController.player
        );
    }

    flee() {
        console.log("You fled!");
        me.state.change(gameController.STATE_OVERWORLD);
    }

}