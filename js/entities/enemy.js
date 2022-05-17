import * as me from "https://esm.run/melonjs";
import gameController from "/index.js";
import { battleController } from "/js/screens/battle.js";
import BattleEntity from "/js/entities/battleEntity.js";

export default class BattleEnemy extends BattleEntity {
    constructor(definition, defense) {
        super(definition, defense);

    }

    attack() {
        let attackResult = battleController.battleBehaviours.attack(
            this, gameController.player
        );
        if (attackResult != null) {
            console.log(`Enemy controller: You have lost to ${attackResult.name}`);
            me.state.change(gameController.STATE_END, "Enemy won");
        }
    }

    defend() {
        battleController.battleBehaviours.defend(
            this
        );
    }

    recover() {
        battleController.battleBehaviours.healthRecover(
            this
        );
    }

    flee() {
        console.log("Enemy controller: I'm fleeing");
    }

}
