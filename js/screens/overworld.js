import * as me from "https://esm.run/melonjs";

export default class OverworldScreen extends me.Stage {

    onResetEvent(room) {
        me.level.load(room, {});


        // override engine gravity calculations
        me.game.world.gravity = {
            "x": 0,
            "y": 0
        };


    }

}