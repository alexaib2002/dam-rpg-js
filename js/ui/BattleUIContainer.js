import * as me from 'https://esm.run/melonjs';
import {ButtonUI} from '../entities/buttons.js';

class BattleUIContainer extends me.Container {
    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.enableChildBoundsUpdate = true;

        this.anchorPoint.set(1, 1);

        this.isPersistent = true;

        this.floating = true;

        this.name = "BattleUIPanel";

        this.selected = false;
        this.hover = false;
        this.grabOffset = new me.Vector2d(0,0);

    }
}

export default BattleUIContainer;