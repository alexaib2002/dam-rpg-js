import * as me from 'https://esm.run/melonjs';
import BattleUIContainer from '../ui/BattleUIContainer.js';
import { ButtonUI } from '../entities/buttons.js';

class BattleScreen extends me.Stage {

    onResetEvent() {
        let backgroundImage = new me.Sprite(
            me.game.viewport.width / 2, me.game.viewport.height / 2,
            {
                image: me.loader.getImage("battle-bg"),
            }
        );
        backgroundImage.scale(
            me.game.viewport.width / backgroundImage.width,
            me.game.viewport.height / backgroundImage.height
        );
        me.game.world.addChild(backgroundImage, 0);


        // init ui elements
        var panel = new BattleUIContainer(
            10, 650, 1020, 120 // FIXME hardcoded
        );

        // FIXME more hardcode
        panel.addChild(new ButtonUI(90, 40, "blue", "Attack"));
        panel.addChild(new ButtonUI(300, 40, "yellow", "Defend"));
        panel.addChild(new ButtonUI(510, 40, "green", "Recover"));
        panel.addChild(new ButtonUI(720, 40, "red", "Esc"));

        me.game.world.addChild(panel, 1);
    }
}

export default BattleScreen;
