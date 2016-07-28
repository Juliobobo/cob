/**
 * Fonction d'authentification par code
 **/
 
 var builder = require('botbuilder');
 var f = require("../functions/usefulFunction");
 var auth = require("authenticator");
 
 var cob = 'cob > ';
 
 module.exports = {
     
    auth: function(){
        return function(session, results, next){
            f.debug('auth');
            
            // Création du code
            var formattedKey = auth.generateKey();
            var formattedToken = auth.generateToken(formattedKey); //Code 6 digits
            
            //Sauvegarde temporaire du results
            session.dialogData.tmpPw = results;
            
            //sauvegarde temporaire du mdp pour faire la comparaison
            var pw = session.dialogData.pw = formattedToken;
            
            //cob donne le mot de passe à l'utilisateur
            session.send(cob + 'Votre mot de passe de session: ' + formattedToken + ' (Retenez le pendant l\'opération)');
            
            if(pw){
               builder.Prompts.text(session, cob + 'Quel est votre mot de passe de session ?'); 
            }else{
                session.error('Error'); // Mettre un vrai messag
            }
            
            
        };
    },
    
    /**
     * Si x = 0, utilisation de la fonction seule
     * Si x = 1, utilisation avec auth
     */
    
    checkingPassword : function(x){
        return function(session, results, next){
            f.debug('checkPw');
            
            var pwUser = results.response;
            var pwGen = session.dialogData.pw;
            
            //Verification que pwUser = nombre
            if(!isNaN(pwUser)){
                // Verification pw
                if(pwUser == pwGen && x == 1){
                    next(session.dialogData.tmpPw);
                }else if(x == 0){
                    if(pwUser == pwGen){
                        next({response : true});
                    }else{
                        next({response : false});   
                    }
                }else{
                    session.send(cob + 'Mauvais password !');
                }
            }else{
               session.send(cob + 'Mauvais password !'); 
            }
        };
    }
 }