// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class ButtonKart{
	value;
	
	constructor(value) {
		this.value = value;
	}
	
	getValue(){
		return this.value;
	}
	
	setValue(value){
		this.value = value;
	}
}
