import * as me from '../../../../lib/melonjs.module.js';
import gameController from "../../../index.js";


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
            gameController.curr_room = me.level.getCurrentLevel().name;
            console.log(gameController.curr_room)
            me.state.change(gameController.STATE_BATTLE, this.selectRandomEnemy());
        }
    }

    selectRandomEnemy() {
        // return me.loader.getJSON("EnemyDefinition")[`enemy_${Math.floor(Math.random() * me.loader.getJSON("EnemyDefinition").length)}`];
        return me.loader.getJSON("EnemyDefinition")["enemy_00"]
    }

}