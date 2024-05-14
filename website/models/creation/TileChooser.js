// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { Map }     from "../entities/Map.js";
import { Tileset } from "../entities/Tileset.js";

export class TileChooser {
	_map;
	_circuit;
	_matrix;
	
	constructor() {
		this._map = new Map(new Tileset("circuit.png"), [[]], [[]]); //PB de chargement au début : pas test de bouger cette ligne
		this.init();
	}
	
	init(){
		let localStorageMatrix;

		localStorage.getItem('modify') === 'true' ? localStorageMatrix = localStorage.getItem('matrixModify') : localStorageMatrix = localStorage.getItem('matrix');

		if(localStorageMatrix === null || localStorageMatrix === "null" || localStorageMatrix === undefined || localStorageMatrix === "undefined" || localStorageMatrix === "") {
			this.newMatrix();
		} else {
			this._matrix = JSON.parse(localStorageMatrix);
		}
		
		const div = document.querySelector('#choosers');
		this._circuit = document.querySelector('#circuit');
		
		// empty circuit
		this._map.dessinerTuiles(this._matrix[0], this._matrix[1], this._circuit, 60);
		this._map.replaceTiles(  this._matrix[0], this._matrix[1], this._circuit, 60, this._matrix[1]);
		
		// 1st container with common tiles. Visible by default.
		const cont1 = document.createElement('section');
		cont1.classList.add('tileSelector');
		cont1.id = "cont1";
		this._map.dessinerTuiles([1, 2, 3, 4, 5, 6, 8, 9, 10, 11], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], cont1, 80, 80);
		div.appendChild(cont1);
		
		// 2nd container with starts and ends. Invisible by default.
		const cont2 = document.createElement('section');
		cont2.classList.add('tileSelector');
		cont2.classList.add('invisible');
		cont2.id = "cont2";
		this._map.dessinerTuiles([7, 12], [0, 0], cont2, 80, 80);
		div.appendChild(cont2);
		
		// 3rd container with checkpoints. Invisible by default.
		const cont3 = document.createElement('section');
		cont3.classList.add('tileSelector');
		cont3.classList.add('invisible');
		cont3.id = "cont3";
		this._map.dessinerTuiles([13, 14, 15, 16, 17, 18], [0, 0, 0, 0, 0, 0], cont3, 80, 80);
		div.appendChild(cont3);
	}
	
	get circuit() {
		return this._circuit;
	}
	
	get map() {
		return this._map;
	}
	
	get matrix() {
		return this._matrix;
	}
	
	setCircuit(value) {
		this._circuit = value;
	}
	
	setMatrix(value) {
		this._matrix = value;
	}
	
	newMatrix() {
		let newMatrix = [[], []];
		for(let i = 0; i < 96; i++) {
			newMatrix[0].push(1);
			newMatrix[1].push(0);
		}
		this._matrix = newMatrix;
	}
	
	reset() {
		this.newMatrix();
		this.map.replaceTiles(this._matrix[0], this._matrix[1], this.circuit, 60, this._matrix[1]);
	}

	reload() {
		// reload the tiles
		this.map.replaceTiles(this._matrix[0], this._matrix[1], this.circuit, 60, this._matrix[1]);

		// reload the selectors
		const div = document.getElementById("choosers");
		for(let i = 0 ; i < 3 ; i++) {
			div.removeChild(div.lastChild);
		}

		const cont1 = document.createElement('section');
		cont1.classList.add('tileSelector');
		cont1.id = "cont1";
		this._map.dessinerTuiles([1, 2, 3, 4, 5, 6, 8, 9, 10, 11], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], cont1, 80, 80);
		div.appendChild(cont1);
		
		// 2nd container with starts and ends. Invisible by default.
		const cont2 = document.createElement('section');
		cont2.classList.add('tileSelector');
		cont2.classList.add('invisible');
		cont2.id = "cont2";
		this._map.dessinerTuiles([7, 12], [0, 0], cont2, 80, 80);
		div.appendChild(cont2);
		
		// 3rd container with checkpoints. Invisible by default.
		const cont3 = document.createElement('section');
		cont3.classList.add('tileSelector');
		cont3.classList.add('invisible');
		cont3.id = "cont3";
		this._map.dessinerTuiles([13, 14, 15, 16, 17, 18], [0, 0, 0, 0, 0, 0], cont3, 80, 80);
		div.appendChild(cont3);

		setTimeout(() => {
			// eventListener to choose the tile you want to place
			const divList = document.querySelectorAll('.tileSelector div');

			for(let i = 0 ; i < divList.length ; i++) {
				divList[i].addEventListener('click', (evt) => {
					
					// to show the selected image
					const children = divList[i].parentElement.children; // get siblings from the same selector
					
					for(let i = 0 ; i < children.length ; i++) {
						
						if (children[i] === evt.currentTarget && !children[i].classList.contains('selected')) {
							children[i].classList.add('selected');
						} else {
							children[i].classList.remove('selected');
						}
					}
				});
			} 
			
			// eventListener on the circuit divs
			const cDivs = document.querySelectorAll('#circuit div');

			for(let i = 0; i < cDivs.length; i++) {
				cDivs[i].oncontextmenu = () => {return false;};
				cDivs[i].addEventListener('mousedown', (evt) => {
					if(evt.button === 0) {  // left click listener (place)
						// if a selector tile is selected, please replace it
						const sDivs = document.querySelectorAll('.tileSelector div');

						for(let j = 0; j < sDivs.length; j++) {
							if(sDivs[j].classList.contains('selected')) {
								this._matrix[0][i] = parseInt(sDivs[j].getAttribute('name'));
								this._map.replaceTiles(this._matrix[0], this._matrix[1], this.circuit, 60, this._matrix[1]);
							}
						}

						localStorage.getItem('modify') === 'false' ? localStorage.setItem('matrix', JSON.stringify(this._matrix)) : localStorage.setItem('matrixModify', JSON.stringify(this._matrix));
					}
				});
			}
		}, 100);
	}
}
