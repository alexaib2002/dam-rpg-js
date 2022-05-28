import * as me from "https://esm.run/melonjs";
import gameController from "/index.js";

const smoothness = 0.4;

export default class OverworldPlayer extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);

        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(
            me.collision.types.WORLD_SHAPE |
            me.collision.types.COLLECTABLE_OBJECT |
            me.collision.types.ACTION_OBJECT
        );

        this.moving = false;

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
            "player0-run",
            "player1-run",
            "player2-run",
            "player3-run",
            "player4-run",
            "player5-run",
        ]);
        this.renderable.addAnimation("idle", [0, 1, 2, 3, 4], 100);
        this.renderable.addAnimation("run", [5, 6, 7, 8, 9], 100);
        this.renderable.setCurrentAnimation("idle");
        this.anchorPoint.set(0.5, .5);
    }

    update(dt) {
        // FIXME hack to scale the game viewport to the screen size
        if (me.game.world) {
            let ratioX = me.game.viewport.width / me.game.world.width;
            let ratioY = me.game.viewport.height / me.game.world.height;

            if (ratioY > ratioX) {
                me.game.world.scale(ratioX, ratioX);
                me.game.world.pos.set(
                    0, me.game.world.height / 6
                );
            } else {
                me.game.world.scale(ratioY, ratioY);
                me.game.world.pos.set(
                    me.game.world.width / 6, 0
                );
            }
        }

        if (me.input.isKeyPressed("left")) {
            this.body.force.x = -this.body.maxVel.x;
            this.renderable.flipX(true);
        } else if (me.input.isKeyPressed("right")) {
            this.body.force.x = this.body.maxVel.x;
            this.renderable.flipX(false);
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
        let isMoving = this.body.vel.x !== 0 || this.body.vel.y !== 0;

        if (this.moving !== isMoving) {
            if (isMoving) {
                this.renderable.setCurrentAnimation("run");
                this.moving = isMoving;
            } else {
                this.renderable.setCurrentAnimation("idle");
                this.moving = isMoving;
            }
        }
        gameController.player.pos = this.pos;

        return (super.update(dt) || isMoving);
    }

    onCollision(response, other) {
        if (response.b.body.collisionType === me.collision.types.WORLD_SHAPE) {
            return true;
        }
        return false;
    }

}