import * as me from "https://esm.run/melonjs";
import BattleScreen from "./js/screens/battle.js";
import DataManifest from "./js/resources.js";

me.device.onReady(function () {
    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(800, 600, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }


    me.loader.preload(
        DataManifest,
        function () {
            me.state.set(me.state.PLAY, new BattleScreen());
            me.state.change(me.state.PLAY);
        }
    )
});
