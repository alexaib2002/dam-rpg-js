import * as me from "https://esm.run/melonjs";
import gameController from "/index.js";
import { battleController } from "/js/screens/battle.js";
import BattleEntity from "/js/entities/battleEntity.js";

export default class BattleEnemy extends BattleEntity {
    constructor(definition, defense) {
        super(definition, defense);
        let offset = definition.offset || {
            "x": 0,
            "y": 0
        };

        let enemySprite = new me.Sprite(
            me.game.viewport.width / 2 + offset.x,
            me.game.viewport.height / 2 + offset.y,
            {
                image: me.loader.getImage(this.sprite),
            });
        enemySprite.scale(
            definition.scaleFactor,
            definition.scaleFactor,
        );
        me.game.world.addChild(enemySprite, 0);
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