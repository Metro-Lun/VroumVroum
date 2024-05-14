// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 8

export class API {
   
   static server = 'localhost:8080';
   
   static getURLTryToConnect() {
      
      return 'http://'+API.server+'/connection/tryToConnect';
   }
   
   static getURLWantToRegistrate() {
      
      return 'http://'+API.server+'/connection/wantToRegistrate';
   }
   
   static getURLgetCircuitTileById() {
      
      return 'http://'+API.server+'/gameplay/getCircuitTileById';
   }
   
   static getURLgetOwnKartByPlayerId() {
      
      return 'http://'+API.server+'/gameplay/getOwnKartByPlayerId';
   }

   static getURLupdateBestTimeOfCircuitByPlayerId() {
      return 'http://'+API.server+'/gameplay/updateBestTimeOfCircuitByPlayerId';
   }

   static getURLgetCircuitInformation() {

      return 'http://'+API.server+'/gameplay/getCircuitInformation';
   }

   static getURLaddVroumCoinToPlayerId() {

      return 'http://'+API.server+'/gameplay/addVroumCoinToPlayerId';
   }
   
   static getURLBestScoreAndNote() {
         
      return 'http://'+API.server+'/gameplay/getBestScoreAndNote';
   }

   static getURLgetKartsAndCoinsByPlayerId() {
      
      return 'http://'+API.server+'/personalize/getKartsAndCoinsByPlayerId';
   }
   
   static getURLpostKartsAndCoinsInformationOfPlayerId() {
      
      return 'http://'+API.server+'/personalize/postKartsAndCoinsInformationOfPlayerId';
   }
   
   static getURLupdatePPIdOfPlayerId() {
      
      return 'http://'+API.server+'/personalize/updatePPIdOfPlayerId';
   }
   
   static getURLupdatePlayerUsername() {
      
      return 'http://'+API.server+'/personalize/updatePlayerUsername';
   }
   
   static getURLupdatePasswordOfPlayerId() {
      
      return 'http://'+API.server+'/personalize/updatePasswordOfPlayerId';
   }

   static getURLpostCircuitsNumber() {

      return 'http://'+API.server+'/hubs/getCircuitsNumber';
   }

   static getURLpostCircuits() {

      return 'http://'+API.server+'/hubs/getCircuits';
   }
   
   static getURLpostCircuitOfPlayerId() {

      return 'http://'+API.server+'/creation/postCircuitOfPlayerId';
   }
   
   static getURLmodifyCircuitOfPlayerId() {
      
      return 'http://'+API.server+'/creation/modifyCircuitOfPlayerId';
   }

   static getURLDeleteCircuit() {

      return 'http://'+API.server+'/hubs/deleteCircuit';
   }

   static getURLDeleteAccount() {

      return 'http://'+API.server+'/connection/tryToDeleteAccount';
   }
}

