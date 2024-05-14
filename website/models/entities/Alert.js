// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

/*
    different types :
        - warning      : lack of vroumCoin, need a connection...
        - info         : just an info
        - input        : need to enter text
        - startCircuit : before the start of the race
        - endCircuit   : after the end of the race
        - save         : to save circuit
        - imgProfile   : choice the image of profile
        - suppr        : to delete an account
        - pwd          : to changer the password
*/

import { API } from "../API.js";
import { updateProfileImageInHeader  } from "../../controllers/redirection/controllerHeader.js";

window.localStorage.setItem("inputField", "");
export class Alert{
    message;
    labelButton;
    link;
    type;

    constructor(message, labelButton, link, type) {
        this.message     = message;
        this.labelButton = labelButton;
        this.link        = link;
        this.type        = type;
        this.buttonClick = 0;
    }

    getIsButtonClicked(){
        return this.buttonClick;
    }

    customAlert() {

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        const alertCustom = document.createElement('div');

        alertCustom.className = 'customAlert';

        switch(this.type){
            case 'warning':
                this.alertWarning(alertCustom, overlay);
                break;
            case 'info' :
                this.alertInfo(alertCustom, overlay);
                break;
            case 'input' :
                this.alertInput(alertCustom, overlay);
                break;
            case 'imgProfile' :
                this.alertImgProfile(alertCustom, overlay);
                break;
            case 'save' :
                this.alertSave(alertCustom, overlay);
                break;
            case 'pwd':
                this.alertPwd(alertCustom, overlay);
                break;
            case 'delete' :
                this.alertDeleteAccount(alertCustom, overlay);
                break;
            default:
                console.error('Aucun cas ne correspond pour Alert !');
        }

        alertCustom.style.display = 'block';
        overlay.style.display = 'block';
    }


    alertWarning(alertCustom, overlay){
        // css :
        alertCustom.style.background = '#ff5f5f';
        alertCustom.style.color = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);

        // css :
        closeButton.style.background = '#d83232';
        closeButton.style.color = '#ffffff';

        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = '#000000';
        });

        closeButton.addEventListener('mouseleave', () => {

            closeButton.style.backgroundColor = '#d83232'; // ou une autre couleur si nécessaire
        });

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id = 'pMessage';
        alertCustom.appendChild(pMessage);

        const actionbutton = document.createElement('button');
        actionbutton.id = 'buttonAlert';
        actionbutton.innerHTML = this.labelButton;

        // css :
        actionbutton.style.background = '#d93232';
        actionbutton.style.color = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';

            if (this.link !== null){
                document.location.href = this.link;
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }
    
    alertInfo(alertCustom, overlay){
        // css :
        alertCustom.style.background = '#6ea5ef';
        alertCustom.style.color      = '#ffffff';
        alertCustom.style.border     = '1px solid #d9323';
        
        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);
        
        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;
        
        // css :
        actionbutton.style.background = '#0048ff';
        actionbutton.style.color      = '#ffffff';
        
        actionbutton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display = 'none';
            
            location.reload();
        });
        
        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }


    alertInput(alertCustom, overlay){

        alertCustom.style.background = '#6ea5ef';
        alertCustom.style.color      = '#ffffff';
        alertCustom.style.border     = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);

        // css :
        closeButton.style.background = '#0048fd';
        closeButton.style.color      = '#ffffff';

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);

        const inputField = document.createElement('input');

        if(this.message !== "Nouveau mot de passe :") {
            inputField.type        = 'text';
            inputField.placeholder = 'Entrez du texte...';
        } else {
            inputField.type        = 'password';
            inputField.placeholder = '';
        }

        inputField.className   = 'inputField';
        alertCustom.appendChild(inputField);

        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#0048ff';
        actionbutton.style.color      = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            localStorage.setItem('inputField', 'none');
        });

        actionbutton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            localStorage.setItem('inputField', inputField.value);
            Alert.updateProfileName(inputField.value);

            if (this.link != null){
                document.location.href = this.link;
            }
        });
        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }


    alertPwd(alertCustom, overlay){

        alertCustom.style.background = '#6ea5ef';
        alertCustom.style.color      = '#ffffff';
        alertCustom.style.border     = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);

        // css :
        closeButton.style.background = '#0048fd';
        closeButton.style.color      = '#ffffff';

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.className = 'changePwd';
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);

        const inputField = document.createElement('input');
        inputField.type        = 'password';
        inputField.className   = 'inputField';
        inputField.id          = 'inputPwd';
        inputField.placeholder = 'Entrez du texte...';
        alertCustom.appendChild(inputField);

        const pInstruction2 = document.createElement('p');
        pInstruction2.innerText = 'Nouveau mot de passe :';
        pInstruction2.classList = 'changePwd2';
        pInstruction2.id        = 'pInstruction2';
        alertCustom.appendChild(pInstruction2);

        const inputField2 = document.createElement('input');
        inputField2.type        = 'password';
        inputField2.className   = 'inputField';
        inputField2.id          = 'inputPwd2'
        inputField2.placeholder = 'Entrez du texte...';
        inputField2.setAttribute("minlength", 12);
        alertCustom.appendChild(inputField2);

        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#0048ff';
        actionbutton.style.color      = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            localStorage.setItem('inputField', 'none');
        });

        actionbutton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            localStorage.setItem('inputChange', inputField.value);
            localStorage.setItem('inputField', inputField2.value);
            if(localStorage.password !== localStorage.inputChange){
                const newAlert = new Alert("Votre mot de passe est incorrect !", "Fermer", null , 'warning');
                newAlert.customAlert();
            }
            else {
                Alert.updateProfileName(inputField2.value);
            }

            if (this.link != null){
                document.location.href = this.link;
            }
        });
        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }


    alertEndCircuit(point, temps){
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        const alertCustom = document.createElement('div');

        alertCustom.className = 'custom-alert';

        alertCustom.style.backgroundColor = 'rgba(84, 88, 91, 0.7)';
        alertCustom.style.color = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);


        // css :
        closeButton.style.background = '#44464a';
        closeButton.style.color      = '#ffffff';


        //alertCustom.innerHTML = this.message+'<br>';
        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        alertCustom.appendChild(pMessage);
        pMessage.style.fontSize = '30px';

        const pPoint = document.createElement('p');
        pPoint.innerText = 'VroumCoin(s) gagné(s) : ' + point;
        alertCustom.appendChild(pPoint);

        
        const pTemps = document.createElement('p');
        pTemps.innerText = "Votre temps : " + temps;
        alertCustom.appendChild(pTemps);


        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#414141';
        actionbutton.style.color      = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            
            document.location.href = "choiceCircuit.html";
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            if (this.link != null){
                document.location.href = this.link;
            }
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);

        alertCustom.style.display = 'block';
        overlay.style.display     = 'block';
    }

    alertStartCircuit(creator, temps){
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        const alertCustom = document.createElement('div');

        alertCustom.className = 'customAlert';

        alertCustom.style.backgroundColor = 'rgba(84, 88, 91, 0.7)';
        alertCustom.style.color  = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);


        // css :
        closeButton.style.background = '#44464a';
        closeButton.style.color      = '#ffffff';


        //alertCustom.innerHTML = this.message+'<br>';
        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        alertCustom.appendChild(pMessage);
        pMessage.style.fontSize = '30px';

        const pCreateur = document.createElement('p');
        pCreateur.innerText = "Créateur : " + creator;
        alertCustom.appendChild(pCreateur);

        const pTemps = document.createElement('p');
        pTemps.innerText = "Temps à battre : " + temps;
        alertCustom.appendChild(pTemps);

        const pEncouragement = document.createElement('p');
        pEncouragement.innerText = 'Bonne chance !';
        alertCustom.appendChild(pEncouragement);


        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#414141';
        actionbutton.style.color = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            document.location.href = this.link;
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            this.buttonClick = 1;
            
        });

        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);

        alertCustom.style.display = 'block';
        overlay.style.display     = 'block';
    }

    alertImgProfile(alertCustom, overlay){
        // css :
        alertCustom.style.background = '#5fdaff';
        alertCustom.style.color      = '#000000';
        alertCustom.style.border     = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);

        // css :
        closeButton.style.background = '#2299b9';
        closeButton.style.color      = '#ffffff';

        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = '#000000';
        });

        closeButton.addEventListener('mouseleave', () => {

            closeButton.style.backgroundColor = '#2299b9'; // ou une autre couleur si nécessaire
        });

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);

        let selectedCanvas = null;
        const tileset = new Image();
        tileset.src = "../../assets/tilesets/circuit.png";

        tileset.onload = () => {

            for (let i = 0; i < 12; i++) {
                const canvas = document.createElement('canvas');
                canvas.width = 60;
                canvas.height = 60;
                canvas.style.marginRight = '10px';

                const ctx = canvas.getContext('2d');

                canvas.id = i;
                const tileSize = 160;
                const rotation = 0;

                const tileX = i * tileSize;
                const tileY = 4 * 160;

                ctx.save();
                ctx.translate(0, 0);
                ctx.rotate(rotation * Math.PI / 180);
                ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
                ctx.restore();

            canvas.addEventListener('click', () => {
                const canvasId = canvas.id;

                    if (selectedCanvas) {
                        selectedCanvas.style.border = 'none';
                    }
                    selectedCanvas = canvas;
                    canvas.style.border = '1px solid #000';

                    localStorage.setItem("imgProfilId", canvasId);

                    Alert.updateProfileImage(localStorage.imgProfilId);
                });

                alertCustom.appendChild(canvas);


            }
            setTimeout(() => {
                const actionbutton = document.createElement('button');
                actionbutton.id = 'buttonAlert';
                actionbutton.innerText = this.labelButton;

                // css :
                actionbutton.style.background = '#2299b9';
                actionbutton.style.color = '#ffffff';

                closeButton.addEventListener('click', () => {
                    alertCustom.style.display = 'none';
                    overlay.style.display     = 'none';
                    Alert.updateProfileImage(localStorage.imgProfilId);
                });

                actionbutton.addEventListener('click', () => {

                    alertCustom.style.display = 'none';
                    overlay.style.display     = 'none';
                    if (this.link != null) {
                        console.log('changement de page');
                        document.location.href = this.link;
                    }
                    Alert.updateProfileImage(localStorage.imgProfilId);
                    updateProfileImageInHeader(localStorage.imgProfilId);
                });

                alertCustom.appendChild(actionbutton);
                document.body.appendChild(alertCustom);
            }, 200);
        }
    };

    static updateProfileImage(imgProfilId) {
        const tileset = new Image();
        tileset.src = "../../assets/tilesets/circuit.png";

        tileset.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const tileSize = 160;

            const tileX = imgProfilId * tileSize;
            const tileY = 4 * 160;

            canvas.width  = 150;
            canvas.height = 150;

            ctx.drawImage(tileset, tileX, tileY, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
            previewImage.src = canvas.toDataURL('image/png');
        };

        const playerId = localStorage.getItem("playerId");

        const url      = API.getURLupdatePPIdOfPlayerId();
        const dataPP = {
            playerIdIn: playerId,
            newPPIdIn:  imgProfilId
        };
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataPP)
        };

        fetch(url, params)
           .then((response) => response.json())
           .then((result) => {
           })
           .catch((err) => {
                console.error(err);
           });
    }

    static updateProfileName(newVal){
        if (localStorage.type === 'pseudo' && newVal !== 'none') {
            const pseudo = document.getElementById('pseudo');
            const playerId = localStorage.getItem("playerId");

            pseudo.innerText = newVal;

            const url         = API.getURLupdatePlayerUsername();
            const dataUsername = {
                playerIdIn:    playerId,
                newUsernameIn: newVal
            };
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataUsername)
            };
            console.log(params);

            fetch(url, params)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                });

            localStorage.setItem("username", newVal);
        }
        else if(localStorage.type === 'password' && newVal !== 'none'){
            console.log('password')
            console.log(localStorage.password);
                const playerId = localStorage.getItem("playerId");

                const url = API.getURLupdatePasswordOfPlayerId();
                const dataPwd = {
                    playerIdIn: playerId,
                    newPwdIn: newVal
                };
                const params = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataPwd)
                };
                console.log(params);

                fetch(url, params)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                    });

                localStorage.setItem("password", newVal);
        }
    }

    alertSave(alertCustom, overlay){
        alertCustom.style.background = '#6ea5ef';
        alertCustom.style.color      = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';
        
        const isModifying = localStorage.getItem("modify");

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);


        // css :
        closeButton.style.background = '#0048fd';
        closeButton.style.color      = '#ffffff';

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);

        const circuitNameInput = document.createElement('input');
        circuitNameInput.setAttribute('maxlength', '15');
        circuitNameInput.setAttribute('minlength', '1');
        circuitNameInput.type        = 'text';
        circuitNameInput.className   = 'inputField';
        circuitNameInput.placeholder = 'Nom du circuit...';
        let circuitName = localStorage.getItem("circuitName");
        if (circuitName === undefined) circuitName = "";
        if (isModifying === "true") circuitNameInput.value = circuitName;
        
        alertCustom.appendChild(circuitNameInput);

        const circuitLapsInput = document.createElement('input');
        circuitLapsInput.setAttribute('min', '1');
        circuitLapsInput.setAttribute('max', '9');
        circuitLapsInput.type        = 'number';
        circuitLapsInput.className   = 'inputField';
        circuitLapsInput.placeholder = 'Nombre de tours...';
        
        let circuitLaps = localStorage.getItem("circuitLaps");
        if (circuitLaps === undefined) circuitLaps = "";
        if (isModifying === "true" && circuitLaps !== "") circuitLapsInput.value = circuitLaps;
        
        alertCustom.appendChild(circuitLapsInput);

        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#0048ff';
        actionbutton.style.color      = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
        });

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
            
            let isCircuitValid = "false";
            if (circuitNameInput.value !== "" && circuitLapsInput.value.match(/^[1-9]$/)) isCircuitValid = "true";
            
            if (isCircuitValid === "false") {
                const errorAlert = new Alert("Veuillez remplir la première entrée et \nmettre un chiffre dans la deuxième.", "OK", "", "warning");
                errorAlert.customAlert();
                
            } else {
                localStorage.setItem('circuitName', circuitNameInput.value);
                localStorage.setItem('circuitLaps', circuitLapsInput.value);
                localStorage.setItem("verifying", "true");
                document.location.href = this.link;
            }
        });
        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }

    alertDeleteAccount(alertCustom, overlay) {
        alertCustom.style.background = '#6ea5ef';
        alertCustom.style.color      = '#ffffff';
        alertCustom.style.border = '1px solid #d9323';

        const closeButton = document.createElement('button');
        closeButton.id        = 'closeAlert';
        closeButton.innerText = 'X';
        alertCustom.appendChild(closeButton);

        // css :
        closeButton.style.background = '#0048fd';
        closeButton.style.color      = '#ffffff';

        const pMessage = document.createElement('p');
        pMessage.innerText = this.message;
        pMessage.id        = 'pMessage';
        alertCustom.appendChild(pMessage);

        const actionbutton = document.createElement('button');
        actionbutton.id        = 'buttonAlert';
        actionbutton.innerText = this.labelButton;

        // css :
        actionbutton.style.background = '#0048ff';
        actionbutton.style.color      = '#ffffff';

        closeButton.addEventListener('click', () => {
            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';
        });

        console.log(localStorage.getItem('playerId'))
        console.log(parseInt(localStorage.getItem('playerId')))

        actionbutton.addEventListener('click', () => {

            alertCustom.style.display = 'none';
            overlay.style.display     = 'none';

            Alert.deleteAccount();

            setTimeout(() => {
                localStorage.setItem("delete", "true");
                localStorage.setItem("playerId", 0);
                localStorage.setItem("isConnected", false);
                document.location.href = this.link;
            }, 200);
            
        });
        alertCustom.appendChild(actionbutton);
        document.body.appendChild(alertCustom);
    }

    static async deleteAccount() {
        let res = 0;
        const dataAcc = {
            playerIdIn: parseInt(localStorage.getItem('playerId'))
        };
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataAcc)
        };

        await fetch(API.getURLDeleteAccount(), params)
           .then((response) => response.json())
           .then((result) => {
            console.log(result);
            res = 12
           })
           .catch((err) => {
                console.error(err);
           });
        return res
    }
}