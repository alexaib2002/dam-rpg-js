import * as me from 'https://esm.run/melonjs';

export class enemyStatsUIContainer extends me.Container{
    constructor(x, y, width, height) {

        super(x, y, width, height);
        this.x = x;
        this.y = y;
       
        // make sure the UI Container bounds are updated
        this.enableChildBoundsUpdate = true;
         // [0, 0] as origin
         this.anchorPoint.set(0, 0);
         // persistent across level change
        this.isPersistent = false;
        // use screen coordinates
        this.floating = true;
        // give a name
        this.name = "EnemyStatsUIPanel";
        // enemy stats frame sprite
        this.enemyStatsFrame = new me.Sprite(
            x, y, 
            {
                image: me.loader.getImage("enemyStats-frame"),
            }

        );

        this.enemyStatsFrame.scale(this.width, this.height);
        this.addChild(this.enemyStatsFrame);
        // input status flags
        this.selected = false;
        this.hover = false;
        // to memorize where we grab the shape
        this.grabOffset = new me.Vector2d(0,0);

    }
}