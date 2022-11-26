import * as me from '../../../lib/melonjs.module.js';
import gameController from "../../index.js";
import { battleController } from "../screens/battle.js";
import BattleEntity from "../entities/battleEntity.js";

export default class BattleEnemy extends BattleEntity {
    constructor(definition) {
        super(definition);
        let offset = definition.offset || {
            "x": 0,
            "y": 0
        };

        this.sprite = new me.Sprite(
            me.game.viewport.width / 2 + offset.x,
            me.game.viewport.height / 2 + offset.y,
            {
                image: me.loader.getImage(this.sprite),
            });
        this.sprite.scale(
            definition.scaleFactor,
            definition.scaleFactor,
        );
        me.game.world.addChild(this.sprite, 0);
    }

    attack() {
        let attackResult = battleController.battleBehaviours.attack(
            this, gameController.player
        );
        if (attackResult != null) {
            console.log(`Enemy controller: You have lost to ${attackResult.name}`);
            battleController.endBattle("defeated");
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
