/**
 * Fonction d'identification
 **/
 
 var builder = require('botbuilder');

 //================================================================
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
 
 //================================================================
 
 /**
  * Fonction d'identification, prénom et nom
  * @param : nb : si nb = 0 juste le prénom ident et one/two, si nb = 1 nom prénom toutes functions
  **/
 var ident = function(nb){
     return  function(session, results, next){
        
        //Initialisation
        session.dialogData.nameModif = false;
        session.dialogData.surnameModif = false;
        
        //Sauvegarde du result
        session.dialogData.tmp = results;
        
        var name = session.userData.name;
        
        session.dialogData.nb = nb;

        if(!name){
            session.dialogData.nameModif = true;
            builder.Prompts.text(session, "Quel est votre prénom ?");
        }else{
            builder.Prompts.confirm(session, "Tu t\'appelles " + name + " ?");
        }
     };
 }
 
  /**
  * Fonction de traitement de l'identification
  **/
 var treatmentOne = function(){
     return function(session, results, next){
      if(results.response){
        // Cas ou l'on veut que le prénom
        if(session.dialogData.nb == 0){
            if(session.dialogData.nameModif){
                session.userData.name = identValid(results.response);     
            }
            next({response : true});
        }
        //Cas prenom et nom
        if(session.dialogData.nb == 1){
            if(session.dialogData.nameModif){
                session.userData.name = identValid(results.response);     
            }
            if(!session.userData.surname){
                session.dialogData.nameModif = false;
                session.dialogData.surnameModif = true;
                builder.Prompts.text(session, "Quel est votre nom de famille ?");    
            }else{
                builder.Prompts.confirm(session, "Tu t\'appelles "+ session.userData.name 
                                        +  ' ' + session.userData.surname + " ?"); 
            }
        }
      }else{
            session.dialogData.nameModif = true;
            builder.Prompts.text(session, "Quel est votre prénom ?");
      }
     };
 }
 
 var treatmentTwo = function(){
     return function(session, results, next){
        if(results.response){
            if(session.dialogData.nb == 0){
                if(session.dialogData.nameModif){
                    session.userData.name = identValid(results.response);     
                }
                next(session.dialogData.tmp);
            }else if(session.dialogData.nb == 1){
                if(session.dialogData.nameModif){
                     session.userData.name = identValid(results.response);
                     
                     if(!session.userData.surname){
                        session.dialogData.surnameModif = true;
                        builder.Prompts.text(session, "Quel est votre nom de famille ?");    
                    }else{
                        builder.Prompts.choice(session, "Tu t\'appelles " + session.userData.name 
                                            +  ' ' + session.userData.surname + " ?", "oui|non"); 
                    }
                }
                if(session.dialogData.surnameModif){
                     session.userData.surname = identValid(results.response);
                     session.dialogData.surnameModif = false;
                     next({response : true});
                }else{
                    next({response : true});
                }
            }
         }else{
            session.dialogData.surnameModif = true;
            builder.Prompts.text(session, "Quel est votre nom de famille ?"); 
        }
     };
 }
 
 var treatmentThree = function(){
     return function(session, results, next){
        if(results.response){
            if(session.dialogData.surnameModif){
                session.userData.surname = identValid(results.response);
                next();
            }else{
                next();
            }
        }else{
            session.dialogData.surnameModif = true;
            builder.Prompts.text(session, "Quel est votre nom de famille ?"); 
        }
     };
 }
 
 var treatmentFour = function(){
     return function(session, results, next){
         if(results.response){
             if(session.dialogData.surnameModif){
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
  exports.treatmentOne = treatmentOne;
  exports.treatmentTwo = treatmentTwo;
  exports.treatmentThree = treatmentThree;
  exports.treatmentFour = treatmentFour;
  exports.identValid = identValid;