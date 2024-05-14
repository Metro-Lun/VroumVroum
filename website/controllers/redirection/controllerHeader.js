// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

// ajout balises script et link en en-tête
const head = document.querySelector('head');
const link = document.createElement('link');

link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', 'styles/headerStyle.css');
head.appendChild(link);

const isConnected = window.localStorage.isConnected;
const header = document.createElement("header");

const a = document.createElement('a');
a.setAttribute("href", "home.html");

const img = document.createElement('img');
img.setAttribute("src", "../../assets/logoLong.png");
img.id = "logo";

a.appendChild(img);
header.appendChild(a);

if (isConnected === "false") {
	
	const divButtons 	   = document.createElement("div");
	const connectionA      = document.createElement("a");
	const connectionButton = document.createElement("button");
	
	const registrationA      = document.createElement("a");
	const registrationButton = document.createElement("button");
	
	connectionButton.id 			= "connection";
	connectionButton.innerText = "Connexion";
	connectionA.setAttribute("href", "connection.html");
	connectionA.appendChild(connectionButton);
	
	registrationButton.id 		  = "register";
	registrationButton.innerText = "Inscription";
	registrationA.setAttribute("href", "registration.html");
	registrationA.appendChild(registrationButton);
	
	divButtons.id = "headerButtons";
	divButtons.appendChild(connectionA);
	divButtons.appendChild(registrationA);
	
	header.appendChild(divButtons);
	
} else {
	const bigdiv = document.createElement('div');
	bigdiv.id = 'burgerWrapper';

	const profileImg = document.createElement("img");
	profileImg.setAttribute("alt", "profile image");
	profileImg.id = "profileImg";
	bigdiv.appendChild(profileImg);
	updateProfileImageInHeader(localStorage.imgProfilId);

	const div = document.createElement('div');
	div.id = 'burger';

	const a1 = document.createElement('a');
	a1.textContent = 'Mon compte';
	a1.id = 'a-acc';
	a1.addEventListener('click', () => {
		document.location.href = 'account.html';
	});
	div.appendChild(a1);

	const a2 = document.createElement('a');
	a2.textContent = 'Mes circuits';
	a2.id = 'a-circ';
	a2.addEventListener('click', () => {
		localStorage.setItem('personal', 'true');
		document.location.href = 'choiceCircuit.html';
	});
	div.appendChild(a2);

	const a3 = document.createElement('a');
	a3.textContent = 'Déconnexion';
	a3.id = 'a-acc';
	a3.addEventListener('click', () => {
		window.localStorage.setItem("isConnected",     "false");
		window.localStorage.setItem("rightPassword",   "false");
		window.localStorage.setItem("username", 		  "anonymous");
		window.localStorage.setItem("playerId", 		  "0");
		window.localStorage.setItem("alreadyRegister", "");
		document.location.href = 'home.html';
	});
	div.appendChild(a3);

	bigdiv.appendChild(div);
	header.appendChild(bigdiv);

	profileImg.addEventListener('click', (evt) => {
		document.querySelector('#burger').classList.toggle('visible');
		updateProfileImageInHeader(localStorage.getItem('imgProfilId'));
	});

	window.onclick = (evt) => {
		if(evt.target.id !== "burgerWrapper" && evt.target.id !== "profileImg") document.querySelector('#burger').classList.remove('visible');
	};
}

export function updateProfileImageInHeader(imageId){
	const tileset = new Image();
	tileset.src = "../../assets/tilesets/circuit.png";

	tileset.onload = function () {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const tileSize = 160;

		const tileX = imageId * tileSize;
		const tileY = 4*160;

		canvas.width = 50;
		canvas.height = 50;

		ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
		profileImg.src = canvas.toDataURL('image/png');
	};
}

// ajout header
document.body.insertBefore(header, document.querySelector('main'));