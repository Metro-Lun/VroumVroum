// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import {Maths} from "../gameplay/Maths.js";

export class Tileset {
    image   = null;
    largeur = null;
    
    constructor(tilesetName) {
        
        this.image = new Image();
        this.image.referenceDuTileset = this;
        
        this.image.onload = function () {
            
            this.referenceDuTileset.largeur = this.width / 160;
            if (!this.complete)
                throw new Error("Erreur de chargement du tileset nommé\"" + tilesetName + "\".");
        };
        this.image.src = "../../assets/tilesets/" + tilesetName;
    }
    
    dessinerTile(numero, context, xDestination, yDestination, degrees, value){
        
        if (value === undefined) value = 160;
        
        let xSourceEnTiles = numero % this.largeur;
        if (xSourceEnTiles === 0){
            xSourceEnTiles = this.largeur;
        }
        const ySourceEnTiles = Math.ceil(numero / this.largeur);
        
        const xSource = (xSourceEnTiles - 1) * 160;
        const ySource = (ySourceEnTiles - 1) * 160;
        
        context.save();
        context.translate(xDestination + 80, yDestination + 80);
        context.rotate(Maths.degToRad(degrees));
        
        context.drawImage(this.image, xSource, ySource, 160, 160, -80, -80, value, value);
        
        context.restore();
    }
}



