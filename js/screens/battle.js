import * as me from 'https://esm.run/melonjs';
import BattleUIContainer from '../ui/BattleUIContainer.js';
import {ButtonUI} from '../entities/buttons.js';

class BattleScreen extends me.Stage {

    onResetEvent() {
        // clear bg
        me.game.world.addChild(new me.ColorLayer("background", "#202020"));

        // init ui elements
        var panel = new BattleUIContainer(
            me.game.viewport.width, me.game.viewport.height, 0 ,0
        );

        var buttonList = [
            new ButtonUI(0,0),
            // new ButtonUI(-buttonRef.width,0),
            // new ButtonUI(-buttonRef.width,-buttonRef.height),
            // new ButtonUI(0,-buttonRef.height),
        ];
        for (var button in buttonList) {
            panel.addChild(buttonList[button]);
        }

        me.game.world.addChild(panel, 1);
    }

    // onResetEvent() {
    //     me.game.world.addChild(new me.ColorLayer("background", "#202020"));

    //     // add a font text display object
    //     me.game.world.addChild(new me.Text(609, 281, {
    //         font: "Arial",
    //         size: 160,
    //         fillStyle: "#FFFFFF",
    //         textBaseline : "middle",
    //         textAlign : "center",
    //         text : "Hello World !"
    //     }));
    // }
}

export default BattleScreen;
