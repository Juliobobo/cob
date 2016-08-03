/**
 * Fonction d'authentification par code
 **/
 
 var builder = require('botbuilder');
 var f = require("../functions/usefulFunction");
 var auth = require("authenticator");
 
 var cob = 'cob > ';
 
//Fonction qui genere un code 6 digits
var password = function(){
    // Création du code
    var formattedKey = auth.generateKey();
    var formattedToken = auth.generateToken(formattedKey); //Code 6 digits
    
    return formattedToken;
}

 module.exports = {
    
    //Fonction password envoi une notif FS4U
    authSend: function(){
        return function(session, results, next){
            f.debug('Envoi notif');
            
            //Génération du password et sauvegarde
            var pw = session.dialogData.pw = password();
            
            //En attente
        }
    },
    
    //fonction auth en donnant le password par le chat
    auth: function(){
        return function(session, results, next){
            // f.debug('auth');
            
            //Sauvegarde temporaire du results
            // session.dialogData.tmpPw = results;
            
            //sauvegarde temporaire du mdp pour faire la comparaison
            var pw = session.dialogData.pw = password();
            
            //cob donne le mot de passe à l'utilisateur
            session.send(cob + 'Votre mot de passe de session: ' + pw + ' (Retenez le pendant l\'opération)');
            
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
            // f.debug('checkPw');
            
            var pwUser = results.response;
            var pwGen = session.dialogData.pw;
            
            //Verification que pwUser = nombre
            if(!isNaN(pwUser)){
                // Verification pw
                if(pwUser == pwGen && x == 1){
                    next(session.dialogData.tmp);
                }else if(x == 0){
                    if(pwUser == pwGen){
                        next({response : true}); //A modifier
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