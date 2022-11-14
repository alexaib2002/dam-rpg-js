import * as me from '../../lib/melonjs.module.js';

export class StatsUIContainer extends me.Container {
    constructor(x, y, width, height) {

        super(x, y, width, height);
        this.x = x;
        this.y = y;

        this.healthBarPosX = 380;
        this.healthBarPosY = 20;
        this.healthBarEnemyWidth = 80;
        this.healthBarPlayerWidth = 80;
        this.healthBarHeight = 12;

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

        // enemy name text
        this.fontName = new me.Text(0, 0, {
            font: "kenpixel",
            size: 25,
            fillStyle: "black",
            textAlign: "center",
            textBaseline: "middle",
            offScreenCanvas: (me.video.renderer.WebGLVersion >= 1)
        });

        // enemy health text
        this.fontHealth = new me.Text(0, 0, {
            font: "kenpixel",
            size: 20,
            fillStyle: "black",
            textAlign: "center",
            textBaseline: "middle",
            offScreenCanvas: (me.video.renderer.WebGLVersion >= 1)
        });

        // input status flags
        this.selected = false;
        this.hover = false;
        // to memorize where we grab the shape
        this.grabOffset = new me.Vector2d(0, 0);


    }

    scaleEnemyHealth(enemyFullHealth, enemyHealth) {
        this.healthBarEnemyWidth = (enemyHealth * 80) / enemyFullHealth;
        this.setEnemyHealthText(enemyFullHealth, enemyHealth);
    }

    scalePlayerHealth(playerFullHealth, playerHealth) {
        this.healthBarPlayerWidth = (playerHealth * 80) / playerFullHealth;
    }

    setEnemyName(enemyName) {
        this.labelName = enemyName;
    }

    setEnemyHealthText(enemyFullHealth, enemyHealth) {

        this.labelHealth = enemyHealth + "/" + enemyFullHealth;

    }



    draw(renderer) {
        super.draw(renderer);
        renderer.setColor('red');
        renderer.fillRect(this.healthBarPosX, this.healthBarPosY, this.healthBarEnemyWidth, this.healthBarHeight);
        this.fontName.draw(renderer,
            this.labelName,
            this.healthBarPosX + 80,
            this.healthBarPosY - 35
        );

        this.fontHealth.draw(renderer,
            this.labelHealth,
            this.healthBarPosX + 135,
            this.healthBarPosY + 8
        );

        renderer.drawImage(me.loader.getImage("heart"), -470, 5, 50, 50);

        renderer.fillRoundRect(this.healthBarPosX - 790, this.healthBarPosY, this.healthBarPlayerWidth, this.healthBarHeight + 5, 2);

        renderer.setColor("black");
        renderer.setLineWidth(5);
        renderer.strokeRoundRect(this.healthBarPosX - 790, this.healthBarPosY, 80 , this.healthBarHeight + 5, 2);

    }


}