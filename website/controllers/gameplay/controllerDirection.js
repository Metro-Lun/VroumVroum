// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class ControllerDirection {
	up;
	down;
	left;
	right;
	
	constructor(){

		this.up = 0;
		this.down = 0;
		this.left = 0;
		this.right = 0;

		const self = this;
		
		window.addEventListener('keydown', function (event) {
			self.handleKeyDown(event);
		});
		window.addEventListener('keyup',function (event){
			self.handleKeyUp(event);
		});

	}
	
	init(){
		this.up = 0;
		this.down = 0;
		this.left = 0;
		this.right = 0;
	}
	
	handleKeyDown(event) {
		switch (event.key) {
			case 'ArrowUp':
				this.up = 1;
				break;
			case 'ArrowDown':
				this.down = 1;
				break;
			case 'ArrowLeft':
				this.left = 1;
				break;
			case 'ArrowRight':
				this.right = 1;
				break;
			case 'z':
				this.up = 1;
				break;
			case 's':
				this.down = 1;
				break;
			case 'q':
				this.left = 1;
				break;
			case 'd':
				this.right = 1;
				break;
		}
	}

	handleKeyUp(event) {
		switch (event.key) {
			case 'ArrowUp':
				this.up = 0;
				break;
			case 'ArrowDown':
				this.down = 0;
				break;
			case 'ArrowLeft':
				this.left = 0;
				break;
			case 'ArrowRight':
				this.right = 0;
				break;
			case 'z':
				this.up = 0;
				break;
			case 's':
				this.down = 0;
				break;
			case 'q':
				this.left = 0;
				break;
			case 'd':
				this.right = 0;
				break;
		}
	}

	get up() {
		return this.up;
	}

	get down() {
		return this.down;
	}

	get left() {
		return this.left;
	}

	get right() {
		return this.right;
	}

	getdirection(){
		return this.right - this.left;
	}
}