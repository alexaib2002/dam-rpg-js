import * as me from "https://esm.run/melonjs";
import gameController from "/index.js";

export default class OverworldPlayer extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);

        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        // player can exit the viewport (jumping, falling into a hole, etc.)
        this.alwaysUpdate = true;

        // walking & jumping speed
        this.body.movSpeed = 5;
        this.body.movMultiplier = 100;

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
}