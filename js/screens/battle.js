import * as me from 'https://esm.run/melonjs';
import BattleUIContainer from '../ui/BattleUIContainer.js';
import { ButtonUI } from '../entities/buttons.js';
import BattleEntity from '../entities/battleEntity.js';
import gameController from '../../index.js';
import BattleBehaviours from '/js/entities/battleBehaviour.js';

var enemy // FIXME enemy should be passed from overworld


class BattleScreen extends me.Stage {

    onResetEvent() {
        this.initUserInterface();
        this.initEnemies();
    }

    initUserInterface() {
        let backgroundImage = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 2,
            {
                image: me.loader.getImage("battle-bg"),
            }
        );
        backgroundImage.scale(
            me.game.viewport.width / backgroundImage.width,
            me.game.viewport.height / backgroundImage.height
        );
        me.game.world.addChild(backgroundImage, 0);


        // init ui elements
        var panel = new BattleUIContainer(
            10, 650, 1020, 120 // FIXME hardcoded
        );

        // FIXME more hardcode
        panel.addChild(new ButtonUI(90, 40, "blue", "Attack"));
        panel.addChild(new ButtonUI(300, 40, "yellow", "Defend"));
        panel.addChild(new ButtonUI(510, 40, "green", "Recover"));
        panel.addChild(new ButtonUI(720, 40, "red", "Esc"));

        me.game.world.addChild(panel, 1);
    }

    initEnemies() {
        let placeholder_enemy_data = me.loader.getJSON("EnemyDefinition").enemy_00;
        enemy = new BattleEntity(placeholder_enemy_data, 10);
        console.log(`A wild ${enemy.name} attacks!!`)
    }

    // controller logic
    attackEntity() {
        console.log("someone is trying to attack");
    }
}

export var battleController = {
    battleBehaviours: new BattleBehaviours(),
    onActionSelected: function (buttonName) {
        switch (buttonName.toLowerCase()) {
            case "attack":
                this.battleBehaviours.attack(
                    gameController.player, enemy
                );
                break;
            case "defend":
                this.battleBehaviours.defend(
                    gameController.player, enemy
                );
                break;
            case "recover":
                this.battleBehaviours.healthRecover(
                    gameController.player, enemy
                );
                break;
            case "esc":
                this.battleBehaviours.flee();
                break;
            default:
                console.log(`${buttonName} action not recognized`);
                break;
        }
    }
}

export default BattleScreen;
