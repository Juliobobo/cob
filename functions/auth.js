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
            
            // auth.verifyToken(formattedKey, formattedToken);
            // f.debug(auth.verifyToken(formattedKey, formattedToken));
            // f.debug(formattedKey);
            
            //Le code généré
            // f.debug(formattedToken);
            
            // f.debug(results);
            
            //Sauvegarde temporaire du results
            session.dialogData.tmpPw = results;
            
            //sauvegarde temporaire du mdp pour faire la comparaison
            var pw = session.dialogData.pw = formattedToken;
            
            //cob donne le mot de passe à l'utilisateur
            session.send(cob + 'Votre mot de passe de session: ' + formattedToken);
            
            if(pw){
               builder.Prompts.text(session, cob + 'Quel est votre mot de passe de session ?'); 
            }else{
                session.error('Error'); // Mettre un vrai messag
            }
            
            
        };
    },
    
    checkingPassword : function(){
        return function(session, results, next){
            f.debug('checkPw');
            
            var pwUser = results.response;
            var pwGen = session.dialogData.pw;
            
            //Verification que pwUser = nombre
            if(!isNaN(pwUser)){
                // Verification pw
                if(pwUser == pwGen){
                    next(session.dialogData.tmpPw);
                }else{
                    session.send(cob + 'Mauvais password ! recommencer votre demande');
                }
            }else{
               session.send(cob + 'Mauvais password ! recommencer votre demande'); 
            }
        };
    }
 }