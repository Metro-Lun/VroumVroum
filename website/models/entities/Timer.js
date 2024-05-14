// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class Timer {

    constructor() {
        this.stoping = 0;
        this.startTime = Date.now();
    }

    getElapsedTime() {
        return Date.now() - this.startTime;
    }
    start(){
        this.startTime = Date.now();
    }  
    stop(){
        this.stoping = 1;
    }

    updateCompteur(){
        if(this.stoping === 0){
            let compteur = document.getElementsByClassName("chronometerLeaderboardTitle")[0];
            let temps = this.getElapsedTime();
            let seconde = Math.floor(temps/1000);
            let min = Math.floor(seconde/60);
            seconde = seconde%60;
            let milliseconds = temps%1000;
            if(seconde<10){
                seconde = "0"+seconde;
            }
            if(milliseconds<10){
                milliseconds = "00"+milliseconds;
            }
            if(milliseconds<100){
                milliseconds = "0"+milliseconds;
            }
            temps = min+":"+seconde+":"+milliseconds;
            compteur.textContent = temps;
        }
    } 
    timeToString(temps){
        let seconde = Math.floor(temps/1000);
        let min = Math.floor(seconde/60);
        seconde = seconde%60;
        let milliseconds = temps%1000;
        if(milliseconds<10){
            milliseconds = "00"+milliseconds;
        }
        if(milliseconds<100){
            milliseconds = "0"+milliseconds;
        }
        temps = min+":"+seconde+":"+milliseconds;
        return temps;
    }
}
