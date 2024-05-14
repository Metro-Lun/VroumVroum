export class CircuitCareTaker {
	history
	
	constructor() {
		this.history = [];
	}
	
	push(matrix) {
		this.history.push(matrix);
	}
	
	pop() {
		if (this.history.length === 0) return null;
		return this.history.pop();
	}
	
	resetStack() {
		this.history = [];
	}
}
