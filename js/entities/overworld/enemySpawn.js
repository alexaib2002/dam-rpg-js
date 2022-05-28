import * as me from "https://esm.run/melonjs";
import gameController from "/index.js";


const rateFactor = 0.01;

export default class EnemySpawn extends me.Entity {

    constructor(x, y, settings) {
        super(x, y, settings);
        // this.rate = settings.rate;
        this.canUpdate = true;
    }

    update(dt) {
        if (this.canUpdate) {
            if (this.contains(gameController.player.pos)) {
                this.tryToSpawnEnemy();
            }
        }
        return super.update(dt);
    }

    tryToSpawnEnemy() {
        // if (Math.random() < this.rate * rateFactor) {
        if (Math.random() < rateFactor) {
            this.canUpdate = false;
            gameController.enemy = this.selectRandomEnemy();
            me.state.change(gameController.STATE_BATTLE);
        }
    }

    selectRandomEnemy() {
        // return me.loader.getJSON("EnemyDefinition")[`enemy_${Math.floor(Math.random() * me.loader.getJSON("EnemyDefinition").length)}`];
        return me.loader.getJSON("EnemyDefinition")["enemy_00"]
    }

}