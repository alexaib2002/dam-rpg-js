import * as me from "https://esm.run/melonjs";
import { BattleScreen } from "/js/screens/battle.js";
import EndScreen from '/js/screens/placeholderEnd.js';
import OverworldScreen from "/js/screens/overworld.js";
import DataManifest from "/js/resources.js";
import Player from "/js/entities/player.js";

import OverworldPlayer from "/js/entities/overworld/owPlayer.js";


me.device.onReady(function() {
    gameController.onload();
});

var gameController = {
    // constant states for the game
    STATE_BATTLE : 1 + me.state.USER,
    STATE_OVERWORLD : 2 + me.state.USER,
    STATE_END : 3 + me.state.USER,


    onload: function () {
        if (!me.video.init(1040, 780, {
            parent : "screen",
            scale : "auto",
            // scaleMethod : "flex-width", // determines if viewport is scaled with browser window
            renderer : me.video.AUTO
        })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.loader.preload(DataManifest, () => {
            me.pool.register("EntPlayer", OverworldPlayer);

            this.texture = new me.TextureAtlas([
                me.loader.getJSON("UI_Assets-0"),
                me.loader.getJSON("UI_Assets-1"),
                me.loader.getJSON("UI_Assets-2"),
                me.loader.getJSON("player"),
                me.loader.getJSON("player-run"),
            ]);

            me.state.transition("fade", "#FFFFFF", 250);

            me.state.set(this.STATE_BATTLE, new BattleScreen());
            me.state.set(this.STATE_OVERWORLD, new OverworldScreen());
            me.state.set(this.STATE_END, new EndScreen());
            me.state.change(this.STATE_OVERWORLD);
        });
    },

    player: new Player(),

}
export default gameController;
