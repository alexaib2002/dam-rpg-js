import * as me from "https://esm.run/melonjs";

export default class OverworldScreen extends me.Stage {

    onResetEvent() {
        var levelContainer = new me.Container();
        me.level.load("room01", {
            container: levelContainer
        });
        // translate levelContainer to the origin coordinate of the viewpor

        let ratioContainer = levelContainer.height / levelContainer.width;
        let ratioX = me.game.viewport.width / levelContainer.width;
        let ratioY = me.game.viewport.height / levelContainer.height;

        if (ratioY > ratioX) {
            levelContainer.scale(ratioX, ratioX);
            levelContainer.pos.set(
                0, levelContainer.height / 6
            );
        } else {
            levelContainer.scale(ratioY, ratioY);
            levelContainer.pos.set(
                levelContainer.width / 6, 0
            );
        }

        // add it to the game world
        me.game.world.addChild(levelContainer);
        me.game.world.gravity = {
            "x": 0,
            "y": 0
        };


    }

}