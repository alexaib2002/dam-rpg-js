import * as me from 'https://esm.run/melonjs';
import BattleUIContainer from '../ui/BattleUIContainer.js';
import { ButtonUI } from '../entities/buttons.js';
import BattleEnemy from '/js/entities/enemy.js';
import gameController from '../../index.js';
import BattleBehaviours from '/js/entities/battleBehaviour.js';

var availableActions = [
    "Attack",
    "Defend",
    "Recover",
    "Flee"
]

function logEntitiesHealth() {
    console.log("------Debugger event:------");
    console.log(`Player health: ${gameController.player.health}`);
    console.log(`Enemy health: ${gameController.enemy.health}`);
    console.log("---------------------------");
}

export class BattleScreen extends me.Stage {
    onResetEvent() {
        this.initUserInterface();
        this.initEnemy(gameController.enemy);
        battleController.onload(gameController.enemy);
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
        me.game.world.addChild(backgroundImage, -100);


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

    initEnemy(enemyJSONData) {
        gameController.enemy = new BattleEnemy(enemyJSONData);
        console.log(`BattleScreen: A wild ${gameController.enemy.name} attacks!!`);
    }
}

export var battleController = {
    playerTurn: false,

    // battle classes
    battleBehaviours: new BattleBehaviours(),

    onload: function () {
        console.log("Battle controller: I have been initialized");
        this.passTurn();
    },

    onActionSelected: function (buttonName) {
        if (this.playerTurn) {
            gameController.player[buttonName.toLowerCase()]();
            logEntitiesHealth();
            this.passTurn();
        } else {
            console.log("Battle controller: Ignoing action selection, it's not player's turn");
        }
    },

    passTurn: function () {
        this.playerTurn ? this.playerTurn = false : this.playerTurn = true;
        console.log(`Battle controller: Player turn -> ${this.playerTurn}`);
        if (!this.playerTurn) {
            enemyController.onTurnReceived();
        }
    }
}

var enemyController = {
    onTurnReceived: function () {
        // TODO determine what action enemy should take
        console.log("Enemy controller: Received the turn");
        this.determineAction();
    },

    determineAction: function () {
        var actionDefinition = {

            normalChoose: function (enemyController) {
                if (actionProbability < 50) {
                    enemyController.determineAttack();
                } else if (actionProbability < 75) {
                    this.onActionSelected("defend");
                } else if (actionProbability < 90) {
                    this.onActionSelected("recover");
                } else {
                    this.onActionSelected("flee");
                }
            },

            alwaysAttack: function (enemyController) { // used only for debugging
                enemyController.determineAttack();
            }

        };

        // TODO choose between attack, defend, recover, or flee
        console.log("Enemy controller: I'm determining my action");
        let actionProbability = Math.floor(Math.random() * 100);
        console.log(`${actionProbability} is the magic number`);

        // TODO create different branches for different health rates
        actionDefinition.alwaysAttack(this);


        console.log("Enemy controller: I have decided");
    },

    determineAttack: function (clever) {
        // contains logic for determining attack
        var chosenAttack;
        var attackDefinition = me.loader.getJSON("AttackDefinition");
        var attackFunctions = {

            randomAttack: function (){
                let attackProbability = Math.floor(Math.random() * Object.keys(gameController.enemy.attacks).length);
                console.log(`${attackProbability} is the attack magic number`);
                let randomAttackName = gameController.enemy.attacks[attackProbability];
                chosenAttack = attackDefinition[randomAttackName];
            },

            attackWithHighestDamage: function () {
                gameController.enemy.attacks.forEach(element => {
                    let enemyAttack = attackDefinition[element];
                    console.log(`Enemy controller: I have ${element} attack`);
                    if (chosenAttack === undefined || chosenAttack.damage < enemyAttack.damage) {
                        chosenAttack = enemyAttack;
                    }
                });
            }

        }
        console.log(Object.keys(gameController.enemy.attacks).length)
        if (clever) { // determine attack based on getting highest damage value
            console.log("Enemy controller: I'm clever");
            attackFunctions.attackWithHighestDamage();
        } else { // determine attack based on random number
            console.log("Enemy controller: I'm not clever");
            attackFunctions.randomAttack();
        }
        console.log(chosenAttack);
        gameController.enemy.attackDamageValue = chosenAttack.damage;

        this.onActionSelected("attack");

    },

    onActionSelected: function (action) {
        gameController.enemy[action]();
        logEntitiesHealth();
        battleController.passTurn();
    }
}
