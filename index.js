import * as me from './lib/melonjs.module.js';
import { BattleScreen } from "./js/screens/battle.js";
import EndScreen from './js/screens/placeholderEnd.js';
import OverworldScreen from "./js/screens/overworld.js";
import TitleScreen from "./js/screens/title.js";
import DataManifest from "./js/resources.js";
import EnemySpawn from "./js/entities/overworld/enemySpawn.js";
import Player from "./js/entities/player.js";

import OverworldPlayer from "./js/entities/overworld/owPlayer.js";


me.device.onReady(function() {
    gameController.onload();
});

var gameController = {
    // constant states for the game
    STATE_BATTLE    : me.state.USER << 1,
    STATE_OVERWORLD : me.state.USER << 2,
    STATE_END       : me.state.USER << 3,


    onload: function () {
        if (!me.video.init(1040, 780, {
            parent : "screen",
            scale : "auto",
            renderer : me.video.AUTO
        })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        me.audio.init("wav");
        me.loader.preload(DataManifest, () => {
            me.pool.register("EntPlayer", OverworldPlayer);
            me.pool.register("EntEnemySpawn", EnemySpawn);

            this.texture = new me.TextureAtlas([
                me.loader.getJSON("UI_Assets-0"),
                me.loader.getJSON("UI_Assets-1"),
                me.loader.getJSON("UI_Assets-2"),
                me.loader.getJSON("player"),
                me.loader.getJSON("player-run"),
            ]);

            me.state.transition("fade", "#FFFFFF", 250);

            me.state.set(this.STATE_BATTLE, new BattleScreen());
            me.state.set(this.TITLE, new TitleScreen());
            me.state.set(this.STATE_OVERWORLD, new OverworldScreen());
            me.state.set(this.STATE_END, new EndScreen());
            me.state.change(this.TITLE);
        });
    },

    curr_room: undefined,
    player: new Player()

}
export default gameController;
