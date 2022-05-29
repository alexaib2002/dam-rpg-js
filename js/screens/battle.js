import * as me from 'https://esm.run/melonjs';
import BattleUIContainer from '../ui/BattleUIContainer.js';
import { ButtonUI } from '/js/entities/buttons.js';
import { StatsUIContainer } from '/js/ui/StatsBattleUIContainer.js';
import BattleEnemy from '/js/entities/enemy.js';
import gameController from '/index.js';
import BattleBehaviours from '/js/entities/battleBehaviour.js';
import Player from '../entities/player.js';


var enemy // FIXME enemy should be passed from overworld

var availableActions = [
    "Attack",
    "Defend",
    "Recover",
    "Flee"
]

var enemy;
var statsPanel;

function logEntitiesHealth() {
    console.log("------Debugger event:------");
    console.log(`Player health: ${gameController.player.health}`);
    console.log(`Enemy health: ${enemy.health}`);
    console.log("---------------------------");
}


function fillHealth() {
    statsPanel.scaleEnemyHealth(enemy.maxHealth, enemy.health);
    statsPanel.scalePlayerHealth(gameController.player.maxHealth, gameController.player.health );
}


export class BattleScreen extends me.Stage {
    onResetEvent(enemyJSON) {
        this.initUserInterface();
        this.initEnemy(enemyJSON);
        battleController.onload();
        this.initAudio();
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
    }

    initEnemy(enemyJSONData) {
        enemy = new BattleEnemy(enemyJSONData);
        console.log(`BattleScreen: A wild ${enemy.name} attacks!!`);
        statsPanel = new StatsUIContainer(
            470, 50, 6, 6
        );
        statsPanel.setEnemyName(enemy.name);
        statsPanel.setEnemyHealthText(enemy.health, enemy.health);

        me.game.world.addChild(statsPanel);
    }

    initAudio() {
        me.audio.stop("overworld-theme");
        me.audio.play("battle-theme-intro", false, function () {
            if (!this.battleEnded) { // fixes multiple playbacks when the battle ends and the intro is still playing
                me.audio.playTrack("battle-theme-loop", true);
            }
        });
    }

}

export var battleController = {
    playerTurn: false,
    battleEnded: false,

    // battle classes
    battleBehaviours: new BattleBehaviours(),

    onload: function () {
        console.log("Battle controller: I have been initialized");
        this.passTurn();
        this.enemy = enemy;
    },

    onActionSelected: function (buttonName) {
        if (this.playerTurn) {
            me.audio.play("button1", false, null, 0.3);
            gameController.player[buttonName.toLowerCase()]();
            fillHealth(enemy.health);
            logEntitiesHealth();
            this.passTurn();
        } else {
            console.log("Battle controller: Ignoing action selection, it's not player's turn");
        }
    },

    passTurn: function () {
        if (!this.battleEnded) {
            this.playerTurn ? this.playerTurn = false : this.playerTurn = true;
            console.log(`Battle controller: Player turn -> ${this.playerTurn}`);
            if (!this.playerTurn) {
                enemyController.onTurnReceived();
            }
        }
    },

    endBattle: function (reason) {
        console.log(`Battle controller: Battle ended: ${reason}`);
        me.audio.stop("battle-theme-intro");
        me.audio.stop("battle-theme-loop");
        switch (reason) {
            case "fled":
                me.state.change(gameController.STATE_OVERWORLD, gameController.curr_room);
                break;
            case "won":
                me.state.change(gameController.STATE_OVERWORLD, gameController.curr_room);
                break;
            case "defeated":
                me.state.change(gameController.STATE_END, "Enemy won");
                break;
            default:
                console.log("Battle controller: Unknown battle end reason");
                break;
        }
        this.battleEnded = true;

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

            randomAttack: function () {
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
        fillHealth(gameController.player.health);
        battleController.passTurn();
    }
}
