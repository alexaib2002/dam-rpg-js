import * as me from "https://esm.run/melonjs";
import gameController from "/index.js";


const rateFactor = 0.01;

export default class EnemySpawn extends me.Entity {

    constructor(x, y, settings) {
        super(x, y, settings);
        // this.rate = settings.rate;
    }

    update(dt) {
        if (this.contains(gameController.player.pos)) {
            this.tryToSpawnEnemy();
        }
        return super.update(dt);
    }

    tryToSpawnEnemy() {
        // if (Math.random() < this.rate * rateFactor) {
        if (Math.random() < rateFactor) {
            console.log("spawning enemy");
        }
    }

}