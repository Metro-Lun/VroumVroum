// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

import { Alert } from "../../models/entities/Alert.js";
import { API }   from "../../models/API.js";

console.log(localStorage)

const input        = document.getElementById('labelFile');
const editButton   = document.getElementById('editButton');
const editPassword = document.getElementById('editPassword');
const vroumcoin    = document.getElementById('vroumcoin');
const pseudo       = document.getElementById('pseudo');
const deleteAccount = document.getElementById('deleteAccount');

const audio = document.createElement("audio");
audio.src 		= "../../assets/soundtrack/accountMusic.mp3";
audio.volume   = 0.0312;
audio.autoplay = true;
audio.loop     = true;
audio.play();


pseudo.innerText = localStorage.username;

const playerId = localStorage.getItem("playerId");

const url = API.getURLgetKartsAndCoinsByPlayerId();
const dataVroumCoins = {
    playerIdIn: playerId
};
const params = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(dataVroumCoins)
};

fetch(url, params)
   .then((response) => response.json())
   .then((result) => {
       vroumcoin.innerText = result.vroumCoins;
   });

Alert.updateProfileImage(localStorage.imgProfilId);

input.addEventListener('click', () => {
    const newAlert = new Alert("Choisissez une image :", "Valider", null, "imgProfile");
    newAlert.customAlert();
    Alert.updateProfileImage(localStorage.imgProfilId);
});

editButton.addEventListener('click', () => {
    window.localStorage.setItem('type', 'pseudo');
    const newAlert = new Alert("Nouveau pseudo :", "Enregistrer", null, "input");
    newAlert.customAlert();
});

editPassword.addEventListener('click', () => {
    window.localStorage.setItem('type', 'password');
    const newAlert = new Alert("Ancien mot de passe : ", "Enregistrer", null, "pwd");
    newAlert.customAlert();
});

document.querySelector('#Form a').addEventListener('click', () =>{
    const newAlert = new Alert("Etes-vous sûr de vouloir supprimer ce compte ?", "Oui !", 'home.html', 'delete');
    newAlert.customAlert();
})
