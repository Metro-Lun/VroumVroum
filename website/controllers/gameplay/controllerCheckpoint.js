// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class ControllerCheckpoint {
    circuit;
    nbTour;
    checkPointCircuit;
    ligne_de_depard;
    nbTourrestant;
    ligne_d_arrive;
    fini;


    constructor(circuit,nbTour) {
        // Constructor code goes here
        this.circuit = circuit;

        this.nbTour        = nbTour;
        this.nbTourrestant = nbTour;

        this.nbCheckPointRestant = 1;
        this.nbCheckPoint        = 0;

        this.fini = 0;
        this.ligne_de_depard = [0,0];
        this.setLigneDepart();
        this.ligne_d_arrive = [0,0];
        this.checkPointCircuit = [];
        this.setCheckPointCircuit();
       
        this.checkPointPassed = [];
    }

    
    setCheckPointCircuit(){
        
        for(let i = 0;i<this.circuit.getHauteur();i++){
            for(let j =0;j<this.circuit.getLargeur();j++){
                
                if(this.circuit.getTerrain()[i][j] >=13 && this.circuit.getTerrain()[i][j] <= 18 ){
                    this.checkPointCircuit.push([i,j]);
                    this.nbCheckPoint++;
                }
            }
        }
        this.nbCheckPointRestant = this.nbCheckPoint;
        
    }

    setLigneDepart(){
        
        for(let i =0;i<this.circuit.getHauteur();i++){
            for(let j = 0;j<this.circuit.getLargeur();j++){
                if(this.circuit.getTerrain()[i][j] === 12 || this.circuit.getTerrain()[i][j] === 7 ){
                    this.ligne_de_depard[0] = i;
                    this.ligne_de_depard[1] = j;
                    return 0;
                }
            }
        }     
    }

    setLigneArrive(){
     
        for(let i =0;i<this.circuit.getHauteur();i++){
            for(let j = 0;j<this.circuit.getLargeur();j++){
                if(this.circuit.getTerrain()[i][j] === 12 || this.circuit.getTerrain()[i][j] === 7){
                    this.ligne_d_arrive[0] = i;
                    this.ligne_d_arrive[1] = j;
                }
            }
        }     
    }
    checkRoue(couleur,x,y){
        
        if(couleur[2] >= 100){
            if(couleur[0] >= 150 && couleur[1] >= 150 && this.nbCheckPointRestant === 0){
                this.nbTourrestant--;
                this.nbCheckPointRestant = this.nbCheckPoint; 
                this.checkPointPassed = [];
                this.updateTour();
                this.updateCheckpoint();
                if(this.nbTourrestant === 0){
                    this.fini = 1; 
                }   
            }else{
                let passed = 0;
                for(let i = 0; i < this.checkPointCircuit.length; i++){
                    if(Math.floor(y/160) === this.checkPointCircuit[i][0] && Math.floor(x/160) === this.checkPointCircuit[i][1]){
                        passed = 1;
                    }
                }
                for(let i = 0; i < this.checkPointPassed.length; i++){
                    if(Math.floor(y/160) === this.checkPointPassed[i][0] && Math.floor(x/160) === this.checkPointPassed[i][1]){
                        passed = 2;
                    }
                }
                if(passed === 1){
                    this.nbCheckPointRestant--;
                    this.checkPointPassed.push([Math.floor(y/160),Math.floor(x/160)]);
                    this.updateCheckpoint();
                }
            }

        }
    }
    getnbCheckPointRestant(){
        return this.nbCheckPointRestant;
    }
    getnbCheckPoint(){
        return this.nbCheckPoint;
    }
    getnbTour(){
        return this.nbTour;
    }
    getnbTourRestant(){ 
        return this.nbTourrestant;
    }
    getFini(){
        return this.fini;
    }
    getLastCheckpoint(){
        if(this.checkPointPassed.length === 0){
            return this.ligne_de_depard;
        }else{
            return this.checkPointPassed[this.checkPointPassed.length-1];
        }
    }
    updateCheckpoint(){
        document.getElementsByClassName("checkpointCountLeaderboardTitle")[0].textContent = "CP : "+ (this.nbCheckPoint-this.nbCheckPointRestant) +"/"+this.nbCheckPoint;
    }
    updateTour(){
        document.getElementsByClassName("lapsCountLeaderboardTitle")[0].textContent = "Tour : "+(this.nbTour - this.nbTourrestant)+"/"+this.nbTour;
    }
    getOrientationLastCheckpoint(){
        let tuile   = this.getLastCheckpoint();
        let terrain = this.circuit.getTerrain();
        let idtuile = terrain[tuile[0]][tuile[1]];

        if (idtuile === 13 || idtuile === 7) {
            const temp = this.circuit.getRotate()[tuile[0]][tuile[1]];
            if (temp === 0) {
                return 270;
            } else {
                return this.circuit.getRotate()[tuile[0]][tuile[1]]-90;
            }
        } else if (idtuile === 14 || idtuile === 16 || idtuile === 17) {
            if (this.circuit.getRotate()[tuile[0]][tuile[1]] === 0) {
                return 315;
            } else {
                return this.circuit.getRotate()[tuile[0]][tuile[1]]-45;
            }
        } else if (idtuile === 15 || idtuile === 18) {
            return this.circuit.getRotate()[tuile[0]][tuile[1]];
        } else if (idtuile === 12) {
            let temp = this.circuit.getRotate()[tuile[0]][tuile[1]];
            if(temp === 0){
                return 90;
            } else if (temp === 90) {
                return 180;
            } else if (temp === 180) {
                return 270
            } else {
                return this.circuit.getRotate()[tuile[0]][tuile[1]]-270;
            }
        }
        return 0;
    }
}
