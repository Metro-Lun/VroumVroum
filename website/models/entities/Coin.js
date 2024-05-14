// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class Coin {
    tilesetPath = null;
    images = null;
    rotations = null;
    tilesPerRow = 12;

    constructor(tilesetPath, images, rotations) {
        this.tilesetPath = tilesetPath;
        this.images      = images;
        this.rotations   = rotations;
        this.tilesPerRow = 12;
    }

    dessinerPiece(targetElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (this.images[0][0] === 33){
            canvas.id = 'canvasPiece';
        }else{
            canvas.id = 'canvasStack';
        }

        const tileSize = 160;

        canvas.width = tileSize * this.images[0].length;
        canvas.height = tileSize;

        const tileset = new Image();
        tileset.src = this.tilesetPath;

        tileset.onload = function () {
            for (let j = 0; j < this.images[0].length; j++) {
                const image = this.images[0][j];
                const rotation = this.rotations[0][j];

                const tileX = (image % this.tilesPerRow) * tileSize;
                const tileY = Math.floor(image / this.tilesPerRow) * tileSize;

                ctx.save();
                ctx.translate(j * tileSize, 0);
                ctx.rotate(rotation * Math.PI / 180);
                ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, tileSize, tileSize);
                ctx.restore();
            }

            targetElement.appendChild(canvas);
        }.bind(this);
    }
}