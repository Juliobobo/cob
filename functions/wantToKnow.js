/**
 * Fonction qui permet à cob de savoir si il sait ou pas
 **/
 var builder = require('botbuilder');
 var brain = require("../data/knowledge");
 var f = require("../functions/usefulFunction")
 
 var cob = 'cob > ';
 
 module.exports = {
  
      /**
       * Notice de fonctionnement
       * - Description :
       *  Ces fonctions fonctionnent ensemble et permet au bot d'apprendre des 
       *  choses sur l'utilisateur
       * 
       * - Fonctionnement
       *  Lorsque ces fonctions vont être utilisées, il faut remplir les 
       *  switch avec un nouveau case et créer et initialiser des check (dans salutation ?)
       *  pour pouvoir compter les tours ou autres.
       * 
       *  Puis renseigner un champs dans knowledge.js pour qu'il comprenne
       *
       **/
       
      // First step: je vérifie si la donnée session.userData.type est connu
      wantToKnow : function(type){
        return function(session, results, next){
           
           f.debug('wantToKnow');
           
           //Sauvegarde de la question initiale dans une variable de session: tmp
           session.dialogData.tmp = results;
           
           //Compteur
           var check;
           
           var know;
           
           //Nécessaire car je veux pouvoir créer en automatisant session.userData.?
           switch (type) {
            case 'wNews':
             know = session.userData.wNews;
             check = session.userData.checkNews;
             break;
            
            default:
             console.log('Connais pas !!');
             // next();
           }
           
           if(!know && check == 1){
             //On passe à 2 les checks
             session.userData.checkNews = 2;
             
             session.send(cob + brain['dontKnow']['wantToKnow']);
             builder.Prompts.text(session, cob + brain[type]['choice']);
           
           }else{
             //On passe à 1 les checks en verifiant qu'il soit différent de 2
             if(session.userData.checkNews != 2){
              session.userData.checkNews = 1; 
             }
             next();
           }
        };
        
     },
     
     //second step, on enregistre l'info sur session.userData.type ?
     recordOrNot : function(type){
       return function(session, results, next){
        
         if(results.response){
          
          var r = results.response;
          r = r.replace('é', 'e');
          
          switch (type) {
           case 'wNews':
            session.userData.wNews = r;
            break;
           
           default:
            session.error('Error !');
          }
         
           next(session.dialogData.tmp);
         
          
         }else{
           // session.error("No reponse");

           switch (type) {
            case 'wNews':
             if(session.userData.checkNews == 2){
              session.send(cob + brain['know']['know'] + ' ' + brain[type]['kNews'] 
              + '%s' + ' !', session.userData.wNews);
             }
             break;
            
            default:
             session.error('Error !');
           }
           
           next(session.dialogData.tmp);
         
         }      
      };
      
     }
     
    //  checkAndChange : function(type){
    //   return function(session, results, next){
    //      // Sauvegarde de la question initiale dans une variable de session: tmp
    //      session.dialogData.tmp = results;
         
    //      var know;
    //      //Nécessaire car je veux pouvoir créer en automatisant session.userData.?
    //      switch (type) {
    //       case 'wNews':
    //        know = session.userData.wNews;
    //        break;
          
    //       default:
    //        console.log('Connais pas !!');
    //      }
         
    //      if(know){
          
    //      }else{
    //       next();
    //      }
    //   };
    // }
     
 }