
import * as me from "https://esm.run/melonjs";
export  default class  HealthBarUI extends me.Renderable {

    constructor(maxHealth, color) {
        super(2, 3, 4, 5);
        this.maxHealth = maxHealth;
        this.color = color;
        
        // create the HTML CANVAS ELEMENT
        const canvas = me.video.createCanvas(4,5);
       
        
        
        // create the Canvas renderer object
        this.canvasHealthBar = new me.CanvasRenderer( {width:4, height:5, canvas: canvas});
        this.canvasHealthBar.setLineWidht = 5;
        this.canvasHealthBar.setColor = "red";
        //this.canvasHealthBar.stroke("Rect", false);
        this.canvasHealthBar.fillRect(2,3,4,5);
        this.canvasHealthBar.strokeRect(2,3,4,5);
        
    

        
    }

        // draw the Canvas Renderer
    draw(renderer) {

       this.draw(this.canvasHealthBar);
       console.log("hola");
    }     
}


    