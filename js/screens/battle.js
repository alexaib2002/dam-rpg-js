import * as me from 'https://esm.run/melonjs';
import BattleUIContainer from '../ui/BattleUIContainer.js';
import { ButtonUI } from '../entities/buttons.js';
import { enemyStatsUIContainer } from '../ui/EnemyUIContainer.js';
import BattleEnemy from '/js/entities/enemy.js';
import gameController from '../../index.js';
import BattleBehaviours from '/js/entities/battleBehaviour.js';


var enemy // FIXME enemy should be passed from overworld

var availableActions = [
    "Attack",
    "Defend",
    "Recover",
    "Flee"
]

function logEntitiesHealth() {
    console.log("------Debugger event:------");
    console.log(`Player health: ${gameController.player.health}`);
    console.log(`Enemy health: ${enemy.health}`);
    console.log("---------------------------");
}

export class BattleScreen extends me.Stage {

    onResetEvent() {
        this.initUserInterface();
        this.initEnemies();
        battleController.onload();
    }

    initUserInterface() {
        // Background Image
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
        var buttonsPanel = new BattleUIContainer(
            10, 650, 1020, 120 // FIXME hardcoded
        );
        
        // FIXME more hardcode
        buttonsPanel.addChild(new ButtonUI(90, 40, "blue", availableActions[0]));
        buttonsPanel.addChild(new ButtonUI(300, 40, "yellow", availableActions[1]));
        buttonsPanel.addChild(new ButtonUI(510, 40, "green", availableActions[2]));
        buttonsPanel.addChild(new ButtonUI(720, 40, "red", availableActions[3]));

        me.game.world.addChild(buttonsPanel, 1);

        var enemyStatsPanel = new  enemyStatsUIContainer(
            470, 50, 6, 6
        );
        enemyStatsPanel.fillEnemyHealth();
        me.game.world.addChild(enemyStatsPanel);
    }
    
    initEnemies() {
        let placeholder_enemy_data = me.loader.getJSON("EnemyDefinition").enemy_07;
        placeholder_enemy_data.defenseval = 5; // FIXME hardcoded defense value
        enemy = new BattleEnemy(placeholder_enemy_data, 5); // FIXME hardcoded defense
        console.log(`BattleScreen: A wild ${enemy.name} attacks!!`);
        console.log(enemy);
        enemyController.onload(enemy);
    }
}

export var battleController = {

    playerTurn: false,

    // battle classes
    battleBehaviours: new BattleBehaviours(),

    onload: function () {
        console.log("Battle controller: I have been initialized");
        this.passTurn();
        this.enemy = enemy; // FIXME ugly code, should be passed from overworld to battleController constructor
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
    enemy: null,

    onload: function (enemy) {
        this.enemy = enemy;
    },

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
                let attackProbability = Math.floor(Math.random() * Object.keys(enemy.attacks).length);
                console.log(`${attackProbability} is the attack magic number`);
                let randomAttackName = enemy.attacks[attackProbability];
                chosenAttack = attackDefinition[randomAttackName];
            },

            attackWithHighestDamage: function () {
                enemy.attacks.forEach(element => {
                    let enemyAttack = attackDefinition[element];
                    console.log(`Enemy controller: I have ${element} attack`);
                    if (chosenAttack === undefined || chosenAttack.damage < enemyAttack.damage) {
                        chosenAttack = enemyAttack;
                    }
                });
            }

        }

        console.log(Object.keys(enemy.attacks).length)
        if (clever) { // determine attack based on getting highest damage value
            console.log("Enemy controller: I'm clever");
            attackFunctions.attackWithHighestDamage();
        } else { // determine attack based on random number
            console.log("Enemy controller: I'm not clever");
            attackFunctions.randomAttack();
        }
        console.log(chosenAttack);
        enemy.attackDamageValue = chosenAttack.damage;

        this.onActionSelected("attack");

    },

    onActionSelected: function (action) {
        enemy[action]();
        logEntitiesHealth();
        battleController.passTurn();
    }
}
