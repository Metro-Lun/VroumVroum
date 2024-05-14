// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import {Alert} from "../../models/entities/Alert.js";
export class ControllerVoiture {
	constructor(valButton,vroumCoin) {
		this.valButton = valButton;
		this.vroumCoin = vroumCoin;
	}

	buttonPress(){
		if (this.valButton === -1){
			this.valButton = 1;
		}
		if (this.valButton > 1){
			if(this.vroumCoin >= this.valButton){
				this.vroumCoin -= this.valButton;
				this.valButton = 1;
			}
			else{
				const newAlert = new Alert("Vous n'avez pas suffisamment de VroumCoins !", "Fermer", null, "warning");
				newAlert.customAlert();
				return 0;
			}
		}
		if (this.valButton === 1){
			this.valButton = -1;
		}
		return 1;
	}

	getUpdatedVroumCoin(){
		return this.vroumCoin;
	}

}
