import * as me from "https://esm.run/melonjs";
import gameController from "/index.js";

const smoothness = 0.4;

export default class OverworldPlayer extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);

        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        // walking & jumping speed
        this.body.setMaxVelocity(2, 2);
        this.body.setFriction(smoothness, smoothness);

        this.alwaysUpdate = true;
        // bind movement keys
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        this.renderable = gameController.texture.createAnimationFromName([
            "player0-idle",
            "player1-idle",
            "player2-idle",
            "player3-idle",
            "player4-idle",
            "player5-idle",
        ]);
        this.renderable.addAnimation("idle", [0, 1, 2, 3, 4], 100);
        this.renderable.setCurrentAnimation("idle");
        this.anchorPoint.set(0.5, .5);
    }

    update(dt) {
        if (me.input.isKeyPressed("left")) {
            this.body.force.x = -this.body.maxVel.x;
        } else if (me.input.isKeyPressed("right")) {
            this.body.force.x = this.body.maxVel.x;
        } else {
            this.body.force.x = 0;
        }
        if (me.input.isKeyPressed("up")) {
            this.body.force.y = -this.body.maxVel.y;
        } else if (me.input.isKeyPressed("down")) {
            this.body.force.y = this.body.maxVel.y;
        } else {
            this.body.force.y = 0;
        }

        console.log(this.body.vel)

        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

    onCollision() {
        return true;
    }

}