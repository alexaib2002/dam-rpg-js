import * as me from "https://esm.run/melonjs";
import BattleScreen from "/js/screens/battle.js";
import EndScreen from '/js/screens/placeholderEnd.js';
import DataManifest from "./js/resources.js";


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
            this.texture = new me.video.renderer.Texture([
                me.loader.getJSON("UI_Assets-0"),
                me.loader.getJSON("UI_Assets-1"),
                me.loader.getJSON("UI_Assets-2")
            ]);
            me.state.set(this.STATE_BATTLE, new BattleScreen());
            me.state.set(this.STATE_END, new EndScreen());
            me.state.change(this.STATE_BATTLE);
        });
    },
    player: {
        "name": "PlayerName",
        "level": 1,
        "exp": 0,
        "health": 100,
        "attack": 10,
        "defense": 10
    }
}
export default gameController;
