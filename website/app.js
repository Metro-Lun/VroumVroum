// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

localStorage.setItem("isConnected",     "false");
localStorage.setItem("rightPassword",   "false");
localStorage.setItem("username", 		 "anonymous");
localStorage.setItem("playerId", 		 "0");
localStorage.setItem("alreadyRegister", "");

localStorage.setItem("circuitId",       "1");
localStorage.setItem("matrix",          "");

localStorage.setItem('save', "false");

localStorage.setItem("personal",        "false");
localStorage.setItem("isChecked",       "false");

localStorage.setItem('test',            "false");
localStorage.setItem("LoadingBar",      "0");

document.location.href="./website/views/home.html";

const text = document.body.getElementById("text");
text.innerText = "Error 500 : Un problème est survenue lors du chargement de la page...";
