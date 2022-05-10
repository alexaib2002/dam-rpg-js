import * as me from "https://esm.run/melonjs";
import BattleScreen from "./js/screens/battle.js";
import DataManifest from "./js/resources.js";


me.device.onReady(function() {
    gameController.onload();
});

var gameController = {
    onload: function () {
        if (!me.video.init(800, 600, {
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
            me.state.set(me.state.PLAY, new BattleScreen());
            me.state.change(me.state.PLAY);
        });
    }
}
export default gameController;
