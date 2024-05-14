// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import {API} from "../../models/API.js";
import {Alert} from "../../models/entities/Alert.js";

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/connectionMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();


async function wantToRegistrate(nickname, password) {
	
	const url = API.getURLWantToRegistrate();
	const data = {
		nicknameIn: nickname,
		passwordIn: password
	};
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	};
	
	await fetch(url, params)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			localStorage.alreadyRegister = data.alreadyRegisterOut;
			
			if (localStorage.alreadyRegister === "false" || localStorage.alreadyRegister === undefined) {
				localStorage.isConnected = "true";
				localStorage.playerId    = data.playerIdOut;
				localStorage.username    = data.usernameOut;
				localStorage.imgProfilId = data.PPIdOut;
				//localStorage.password = password;
				if(localStorage.getItem("hasATime") !== undefined) {
					let url = API.getURLupdateBestTimeOfCircuitByPlayerId();
					const dataPlayer = {
						playerIdIn : data.playerIdOut,
						circuitIdIn : localStorage.getItem("circuitIdNoAccount"),
						newBestTimeIn : localStorage.getItem("bestTimeNoAccount")
					};
					const params = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(dataPlayer)
					};
					
					fetch(url, params)
						.then((response) => response.json())
						.then((dataPlayer) => {
						}).catch((err) => {
							console.error("Fetch failed / " + err);
						});
				}
				document.location.href="../views/home.html";
			} else {
				const newAlert = new Alert("Ce pseudo est déjà utilisé !",  "Fermer", null, "warning");
				newAlert.customAlert();
			}
		})
		.catch(() => {
			console.error("Fetch failed");
		});
}

const form = document.getElementById("form");
form.addEventListener('submit', (event) => {
	event.preventDefault();
	
	const nickname   		 = document.getElementById("nickname").value;
	const password 		 = document.getElementById("pwd").value;
	const confirmPassword = document.getElementById("confpwd").value;
	
	if (password === confirmPassword && password !== "") {
		wantToRegistrate(nickname, password);
		
	} else {
		const newAlert = new Alert("Attention, les mots de passe ne sont pas les mêmes !",  "Fermer", null, "warning");
		newAlert.customAlert();
	}
});