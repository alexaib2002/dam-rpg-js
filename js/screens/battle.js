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
            new ButtonUI(-100,-100, "TestingButton", "blue")
        ];
        for (var button in buttonList) {
            panel.addChild(buttonList[button]);
        }

        me.game.world.addChild(panel, 1);
    }
}

export default BattleScreen;
