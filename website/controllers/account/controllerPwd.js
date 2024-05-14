// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

feather.replace();

const eyePwd = document.getElementById("eye");
const eyeoffPwd = document.getElementById("eye-off");
const passwordField = document.getElementById("pwd");

const eyeConfPwd = document.getElementById("confeye");
const eyeConfoffPwd = document.getElementById("confeye-off");
const passwordConfField = document.getElementById("confpwd");



eyePwd.addEventListener("click", () => {
    eyePwd.style.display = "none";
    eyeoffPwd.style.display = "block";
    passwordField.type = "text";
});

eyeoffPwd.addEventListener("click", () =>{
    eyeoffPwd.style.display = "none";
    eyePwd.style.display = "block";
    passwordField.type = "password";
});

if(eyeConfPwd) {
    eyeConfPwd.addEventListener("click", () => {
        eyeConfPwd.style.display = "none";
        eyeConfoffPwd.style.display = "block";
        passwordConfField.type = "text";
    });
}

if(eyeConfoffPwd) {
    eyeConfoffPwd.addEventListener("click", () => {
        eyeConfoffPwd.style.display = "none";
        eyeConfPwd.style.display = "block";
        passwordConfField.type = "password";
    });
}