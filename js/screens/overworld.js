import * as me from '../../../lib/melonjs.module.js';

export default class OverworldScreen extends me.Stage {

    onResetEvent(room) {
        me.level.load(room, {});
        this.initAudio();

        // override engine gravity calculations
        me.game.world.gravity = {
            "x": 0,
            "y": 0
        };


    }

    initAudio() {
        me.audio.stop("title-screen-theme");
        me.audio.playTrack("overworld-theme");
    }
}