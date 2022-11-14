import * as me from '../../../lib/melonjs.module.js';

export default class EndScreen extends me.Stage {
    onResetEvent(status) {
        console.log("now in end screen");
        me.game.world.addChild(new me.ColorLayer("background", "#202020"));

        me.game.world.addChild(new me.Text(300, 300 ,{
            font: "kenpixel",
            size: 64,
            fillStyle: "white",
            textAlign: "center",
            textBaseline: "middle",
            offScreenCanvas: (me.video.renderer.WebGLVersion >= 1),
            text: status
        }));
    }
}