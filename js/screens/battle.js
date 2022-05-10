import * as me from 'https://esm.run/melonjs';
import BattleUIContainer from '../ui/BattleUIContainer.js';
import { ButtonUI } from '../entities/buttons.js';

class BattleScreen extends me.Stage {

    onResetEvent() {
        // clear bg
        me.game.world.addChild(new me.ColorLayer("background", "#202020"), 0);

        // init ui elements
        var panel = new BattleUIContainer(
            10, 470, 780, 120 // FIXME hardcoded
        );

        // FIXME more hardcode
        panel.addChild(new ButtonUI(20, 40, "blue", "Attack"));
        panel.addChild(new ButtonUI(230, 40, "yellow", "Defend"));
        panel.addChild(new ButtonUI(440, 40, "green", "Recover"));
        panel.addChild(new ButtonUI(650, 40, "red", "Esc"));

        me.game.world.addChild(panel, 1);
    }
}

export default BattleScreen;
