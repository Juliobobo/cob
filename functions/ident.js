/**
 * Fonction d'identification
 **/
 
 var builder = require('botbuilder');
 var f = require("../functions/usefulFunction");
 var prompts = require('../data/prompts');
 
 var cob = 'cob > ';
 
  /**
  * Fonction de vérification de la validé du nom et / ou prénom
  **/
 var identValid = function(s){
     if(s.length < 25){
        return s.replace(/[^a-zA-Z]/g,'').toLowerCase();  
     }else{
        return 'error';
     }
 }  
 
 
 /**
  * Fonction d'identification, prénom et nom
  * @param : nb : si nb = 0 juste le prénom, si nb = 1 nom prénom
  **/
 var ident = function(nb){
     return  function(session, results, next){
        
        //Sauvegarde du result
        session.dialogData.tmp = results;
        
        var name = session.userData.name ;
        
        session.dialogData.nb = nb;

        if(!name){
            builder.Prompts.text(session, cob + "Quel est votre prénom ?");
        }else{
            builder.Prompts.confirm(session, cob + "Tu t\'appelles "+ name + " ?");
        }
     };
 }
 
  /**
  * Fonction de traitement de l'identification
  **/
 var treatmentName = function(){
     return function(session, results, next){
       if(results.response){
        // Cas ou l'on veut que le prénom
        if(session.dialogData.nb == 0){
            session.userData.name = identValid(results.response);   
        }
        //Cas prenom et nom
        if(session.dialogData.nb == 1){
            if(!session.userData.name){
                session.userData.name = identValid(results.response);    
            }
            if(!session.userData.surname){
                builder.Prompts.text(session,cob + "Quel est votre nom de famille ?");    
            }else{
                builder.Prompts.confirm(session, cob + "Tu t\'appelles "+ session.userData.name 
                                        +  ' ' + session.userData.surname + " ?"); 
            }
        }else{
            next();
        }
       }else{
          session.send(cob + prompts.error); //le no n'est pas traité
       }
     };
 }
 
 var treatmentSurname = function(){
     return function(session, results, next){
       if(results.response && session.dialogData.nb == 1){
           if(!session.userData.surname){
                session.userData.surname = identValid(results.response);    
           }
       }
       next(session.dialogData.tmp);
     };
 }
 
 /**
  * Export
  **/
  exports.ident = ident;
  exports.treatmentName = treatmentName;
  exports.treatmentSurname = treatmentSurname;
//   exports.identValid = identValid;