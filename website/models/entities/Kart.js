// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class Kart {
	kartTileX;
	kartTileY;
	rotate;

	constructor(ligne, colone, rotation){
		this.kartTileX = ligne;
		this.kartTileY = colone;
		this.rotate    = rotation;
	}
	
	getLigne() {
		return this.kartTileX;
	}
	
	getColone() {
		return this.kartTileY;
	}
	getRotate() {
		return this.rotate;
	}
}

