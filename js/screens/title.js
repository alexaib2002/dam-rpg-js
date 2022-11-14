import * as me from '../../../lib/melonjs.module.js';
import gameController from "/index.js";

const bgSpeedFactor = .2;

export default class BattleScreen extends me.Stage {

    // animations
    animationState = [
        "moveLeft",
        "moveRight",
    ]
    animationCurrentState = this.animationState[0];

    // global properties
    bgEntity = undefined;
    startTxt;

    onResetEvent() {
        this.initBackground();
        this.initAudio();

        me.input.bindKey(me.input.KEY.ENTER, "game-start", true);

        // TODO add title logo
        let titleSprite = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 4, {
                image: me.loader.getImage("title-logo"),
            }
        );
        titleSprite.anchorPoint.set(0.5, 0.5);
        titleSprite.scale(.8, .8);
        me.game.world.addChild(titleSprite, 100);
        // TODO wait for user input to start game
        this.startTxt = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 2 + me.game.viewport.height / 3, {
                image: me.loader.getImage("start-text"),
            }
        );
        this.startTxt.anchorPoint.set(0.5, 0.5);
        this.startTxt.scale(.3, .3);
        me.game.world.addChild(this.startTxt, 100);
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

    initAudio() {
        me.audio.playTrack("title-screen-theme");
    }

    update(dt) {
        // FIXME switch case shouldn't be on update function, trigger event instead to change animation state
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

        if (me.input.isKeyPressed("game-start")) {
            // TODO should check is form has been filled
            buttonActionNameSpace.gameStart();
        }

        return super.update(dt);
    }

}

var buttonActionNameSpace = {
    gameStart: function() {
        me.state.change(gameController.STATE_OVERWORLD, "room11_2");
    }
}
