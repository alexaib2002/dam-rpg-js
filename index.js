import * as me from "https://esm.run/melonjs";
import BattleScreen from "./js/screens/battle.js";
import DataManifest from "./js/resources.js";

var resourceHolder = {
    assignAtlas: function () {
        this.texture = new me.video.renderer.Texture([
            me.loader.getJSON("UI_Assets-0"),
            me.loader.getJSON("UI_Assets-1"),
            me.loader.getJSON("UI_Assets-2")
        ])
    }
};

me.device.onReady(function () {
    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(1920, 1080, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    me.loader.preload(DataManifest, () => {
        resourceHolder.assignAtlas();
        me.state.set(me.state.PLAY, new BattleScreen());
        me.state.change(me.state.PLAY);
    });
});

export default resourceHolder;
