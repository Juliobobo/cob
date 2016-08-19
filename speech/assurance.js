var builder = require('botbuilder');
var f = require('../functions/usefulFunction');
var connaissance = require('../data/knowledge');
var bdd = require("../data/bdd");
var prompts = require('../data/prompts');
var auth = require("../functions/auth");
var ident = require("../functions/ident");
var geolocation = require("../functions/geolocation");


module.exports = {
    assurance : [
        //Identification
        ident.ident(1),
        ident.treatmentOne(),
        ident.treatmentTwo(),
        ident.treatmentThree(),
        ident.treatmentFour(),
        
        //authentification
        // auth.auth(),
        // auth.checkingPassword(1),
        
        //Geolocalisation
        // geolocation.geolocation(), 
        
        function(session, results, next){
            // session.send("Bienvenue "+ session.userData.name 
            //                             +  ' ' + session.userData.surname + " !");
            if(results.response){
                // f.debug('true');
               session.dialogData.assurance = 0;
               next();
            }else{
                session.dialogData.assurance = 1;
                builder.Prompts.text(session, "Bienvenue "+ session.userData.name 
                                        +  ' ' + session.userData.surname + ", \n\n" + 'Indiquez l\'adresse où vous vous trouvez !');
               
                // Auto complete
                //google locations
            }
            
        },
        
        function(session, results, next){
            if(session.dialogData.assurance == 1){
                session.dialogData.assurance = 0;
                session.dialogData.addrAssurance = results.response;
            }
            
            if(session.dialogData.assurance == 0){
                //Fausse base de données
                var i = 1;
                
                if(bdd['assure'][i]['name'] == session.userData.name 
                    && bdd['assure'][i]['surname'] == session.userData.surname){
                    if(bdd['assure'][i]['depannage']){
                        session.send('Le dépanneur arrive dans les 10min');
                    }else{
                        session.send('Vous n\'êtes pas éligible à l\'offre dépannage !');
                    }
                }else{
                   session.send('Vous n\'êtes pas client chez nous !'); 
                }
                    
            }
        }
    ]
}