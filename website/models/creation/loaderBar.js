// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

const valBar = window.localStorage.barChargement;

document.addEventListener("DOMContentLoaded", function() {
    const loaderBar = document.getElementById("loaderBar");
    const carImage = document.getElementById("carImage");
    const loaderContainer = document.getElementById("loaderContainer");
    const main = document.getElementById("welcome");
    const header = document.querySelector("header");

    let decrement = 1;
    let nbTour = 1;

    if (valBar === "0"){
        loaderContainer.style.display = "flex";
        header.style.display = "none";
        let width = 0;
        let interval = setInterval(function () {
            if (width >=50){
                setTimeout(function() {
                    clearInterval(interval);
                    loaderContainer.style.display = "none";
                    main.style.display = 'grid';
                    header.style.display = 'grid';
                }, 500);
            }
            else{
                if (nbTour%18 === 0){
                    decrement -= 0.21;
                }

                nbTour += 1;
                width += decrement;
                //width++;
                loaderBar.style.width = width + "%";

                let carPosition = (width * (loaderContainer.offsetWidth - carImage.offsetWidth) / 100 - carImage.offsetWidth/4);
                carImage.style.left = carPosition + "px";

                let carVerticalPosition = (loaderBar.offsetHeight - carImage.offsetHeight) / 2;
                carImage.style.top = carVerticalPosition + "px";
            }
        }, 25);

        window.localStorage.setItem("loadingBar", "1");
    }else{
        loaderContainer.style.display = "none";
        main.style.display = 'grid';

    }
});