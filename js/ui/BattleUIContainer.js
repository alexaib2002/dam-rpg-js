import * as me from 'https://esm.run/melonjs';
import gameController from '/index.js';

class BattleUIContainer extends me.Container {

    constructor(x, y, width, height) {

        super(x, y, width, height);
        // make sure the UI Container bounds are updated
        this.enableChildBoundsUpdate = true;
        // [0, 0] as origin
        this.anchorPoint.set(0, 0);
        // persistent across level change
        this.isPersistent = false;
        // use screen coordinates
        this.floating = true;
        // give a name
        this.name = "BattleUIPanel";
        // back panel sprite
        this.panelSprite = gameController.texture.createSpriteFromName(
            "grey_panel",
            { width : this.width, height : this.height},
            true
        );
        this.addChild(this.panelSprite);
        // input status flags
        this.selected = false;
        this.hover = false;
        // to memorize where we grab the shape
        this.grabOffset = new me.Vector2d(0,0);

    }

}

export default BattleUIContainer;