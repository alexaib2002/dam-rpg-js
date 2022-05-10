import * as me from 'https://esm.run/melonjs';
import gameController from '../../index.js';

export class ButtonUI extends me.GUI_Object {
    constructor(x, y, label, color) {
        super(x, y, {
            image: gameController.texture,
            region: color + "_button06"
        });
        this.label = label;
        this.anchorPoint.set(0, 0);

        this.font = new me.Text(0, 0 ,{
            font: "kenpixel",
            size: 24,
            fillStyle: "white",
            textAlign: "center",
            textBaseline: "middle",
            offScreenCanvas: (me.video.renderer.WebGLVersion >= 1)
        });

        this.floating = false;
        this.pos.z = 4;
    }

    draw(renderer) {
        super.draw(renderer);
        this.font.draw(renderer,
            this.label,
            this.pos.x + this.width / 2,
            this.pos.y + this.height / 2
        );
        console.log(this.pos);
    }
};

