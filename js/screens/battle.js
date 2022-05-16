import * as me from 'https://esm.run/melonjs';
import BattleUIContainer from '../ui/BattleUIContainer.js';
import { ButtonUI } from '../entities/buttons.js';
import BattleEntity from '../entities/battleEntity.js';
import gameController from '../../index.js';
import BattleBehaviours from '/js/entities/battleBehaviour.js';

var enemy // FIXME enemy should be passed from overworld

var availableActions = [
    "attack",
    "defend",
    "recover",
    "flee"
]

class BattleScreen extends me.Stage {

    onResetEvent() {
        this.initUserInterface();
        this.initEnemies();
        battleController.onload();
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
        panel.addChild(new ButtonUI(90, 40, "blue", availableActions[0]));
        panel.addChild(new ButtonUI(300, 40, "yellow", availableActions[1]));
        panel.addChild(new ButtonUI(510, 40, "green", availableActions[2]));
        panel.addChild(new ButtonUI(720, 40, "red", availableActions[3]));

        me.game.world.addChild(panel, 1);
    }

    initEnemies() {
        let placeholder_enemy_data = me.loader.getJSON("EnemyDefinition").enemy_00;
        enemy = new BattleEntity(placeholder_enemy_data, 10);
        console.log(`A wild ${enemy.name} attacks!!`);
        console.log(enemy);
        enemyController.onload(enemy);
    }
}

export var battleController = {

    playerTurn: false,

    // battle classes
    battleBehaviours: new BattleBehaviours(),

    onload: function () {
        console.log("Battle controller has initialized");
        this.passTurn();
    },

    onActionSelected: function (buttonName) {
        if (this.playerTurn) {
            switch (buttonName.toLowerCase()) {
                case "attack":
                    let attackResult = this.battleBehaviours.attack(
                        gameController.player, enemy
                    );
                    if (attackResult != null) {
                        console.log(`You defeated ${attackResult.name}`);
                        me.state.change(gameController.STATE_END, "Player won");
                    }
                    break;
                case "defend":
                    this.battleBehaviours.defend(
                        gameController.player
                    );
                    break;
                case "recover":
                    this.battleBehaviours.healthRecover(
                        gameController.player
                    );
                    break;
                case "flee":
                    this.battleBehaviours.flee();
                    break;
                default:
                    console.log(`${buttonName} action not recognized`);
                    break;
            }
            console.log("------Debugger event:------");
            console.log(`Player health: ${gameController.player.health}`);
            console.log(`Enemy health: ${enemy.health}`);
            this.passTurn();
        } else {
            console.log("Ignoing action selection, it's not player's turn");
        }
    },

    passTurn: function () {
        this.playerTurn ? this.playerTurn = false : this.playerTurn = true;
        console.log(`Player turn: ${this.playerTurn}`);
        if (!this.playerTurn) {
            enemyController.onTurnReceived();
        }
    }
}

var enemyController = {
    enemy: null,

    onload: function (enemy) {
        this.enemy = enemy;
    },

    onTurnReceived: function () {
        // TODO determine what action enemy should take
        console.log("Enemy: I have received the turn");
        this.determineAction();
    },

    determineAction: function () {
        // TODO choose between attack, defend, recover, or flee
        console.log("Enemy: I'm determining my action");
        console.log("Enemy: I have decided");
        this.onActionSelected("attack");
    },

    determineAttack: function () {
        enemy.attacks.forEach(element => {
            console.log(element);
        });
    },
    onActionSelected: function (action) {
        // TODO execute action
        battleController.passTurn();
    }
}

export default BattleScreen;
