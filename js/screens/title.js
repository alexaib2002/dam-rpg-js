import * as me from "https://esm.run/melonjs";

const bgSpeedFactor = .6;

export default class BattleScreen extends me.Stage {

    // animations
    animationState = [
        "moveLeft",
        "moveRight",
    ]
    animationCurrentState = this.animationState[0];

    // global properties
    bgEntity = undefined;

    onResetEvent() {
        this.initBackground();
    }

    initBackground() {
        let bgSprt = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 2,
            {
                image: me.loader.getImage("title-bg"),
            }
        );

        this.limRight = bgSprt.width / 2 - me.game.viewport.width / 2;
        this.limLeft = -bgSprt.width / 2  + me.game.viewport.width / 2;

        this.bgEntity = new me.Entity(0,0, {
                width: bgSprt.width,
                height: bgSprt.height,
        });

        console.log(this.limRight)

        this.bgEntity.renderable = bgSprt;
        this.bgEntity.body.ignoreGravity = true;

        me.game.world.addChild(this.bgEntity, -100);
    }

    update(dt) {
        console.log(`bgEntity.pos.x: ${this.bgEntity.pos.x}`);
        switch (this.animationCurrentState) {
            case this.animationState[0]:
                if (this.bgEntity.pos.x >= this.limRight) {
                    this.animationCurrentState = this.animationState[1];
                } else {
                    this.bgEntity.body.vel.x = bgSpeedFactor;
                }
                break;

            case this.animationState[1]:
                if (this.bgEntity.pos.x <= this.limLeft) {
                    this.animationCurrentState = this.animationState[0];
                } else {
                    this.bgEntity.body.vel.x = -bgSpeedFactor;
                }
                break;
        }
        return super.update(dt);
    }

}
