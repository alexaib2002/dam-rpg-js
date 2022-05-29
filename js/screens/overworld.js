import * as me from "https://esm.run/melonjs";

export default class OverworldScreen extends me.Stage {

    onResetEvent() {
        me.level.load("room11_2", {});


        // override engine gravity calculations
        me.game.world.gravity = {
            "x": 0,
            "y": 0
        };


    }

}