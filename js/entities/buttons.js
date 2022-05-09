import * as me from 'https://esm.run/melonjs';


export class ButtonUI extends me.GUI_Object {
    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, {
            image: me.loader.getImage("defButton"),
        });
        this.anchorPoint.set(0, 0);
        this.floating = false;
        this.pos.z = 4;
    }
};

