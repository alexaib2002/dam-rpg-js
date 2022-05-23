import * as me from "https://esm.run/melonjs";

export default class OverworldScreen extends me.Stage {

    onResetEvent() {
        var levelContainer = new me.Container();
        me.level.load("room01", {
            container: levelContainer
        });
        // translate levelContainer to the origin coordinate of the viewport
        levelContainer.pos.set(
            0,0
        );
        // FIXME hardcode in scaling the room container
        levelContainer.scale(
            2,
            2,
        );
        // add it to the game world
        me.game.world.addChild(levelContainer);
    }

}