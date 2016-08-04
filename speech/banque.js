var builder = require('botbuilder');
var f = require('../functions/usefulFunction');
var connaissance = require('../data/knowledge');
var prompts = require('../data/prompts');
var auth = require("../functions/auth");
var ident = require("../functions/ident");
var a = require('../functions/askAnswer');
var bdd = require("../data/bdd");

var cob = 'cob > ';


module.exports = {
    makeMoneyTransfert:[
        a.question('action'),
        
        //Identification
        ident.ident(1),
        ident.treatmentOne(),
        ident.treatmentTwo(),
        ident.treatmentThree(),
        ident.treatmentFour(),
        //Fonction authentification
        auth.auth(),
        auth.checkingPassword(1),
        
        // Traitement
        function(session, results){
            // f.debug('Effectuer un virement');
            session.send(cob + 'Bienvenue %s dans l\'espace "Effectuer un virement"', session.userData.name);

            var data = session.dialogData.tmp;

            if(data){
                data = data.response;  
                
                //Who
                builder.Prompts.choice(session, cob + connaissance[data.entity]['who'], bdd['destinataire']);
                
                // A TROUVER : CHANGER LE I DIDN'T UNDERSTAND QUAND IL Y A UNE ERREUR
                // MODIFIER LES PROMPTS
                
            }else{
              session.send(cob + prompts.error); 
            }
        },
        function(session, results){
            // f.debug(results);
            
            if(results.response){
                
                var infoDest = bdd['destinataire'][results.response.entity];
                
                
                session.send(cob + 'Titulaire: %(titulaire)s \n '
                                   + 'Domiciliation: %(domiciliation)s \n'
                                   + 'Référence Bancaire: %(refBancaire)s \n'
                                   + 'IBAN: %(IBAN)s \n'
                                   + 'BIC: %(BIC)s \n'
                                   + 'Banque: %(banque)s' , infoDest );
                
                //On enregistre le result
                session.dialogData.transfertWho = results.response;
                
                //Results venant de LUIS 
                var data = session.dialogData.tmp.response;
                
                //How
                builder.Prompts.number(session, cob + connaissance[data.entity]['how']);
                
            }else{
                session.send(cob + prompts.error);
            }
        },
        function(session, results){
            // f.debug(results);
            
            if(results.response){
                //On enregistre le result
                session.dialogData.transfertHow = results.response;
                
                //Results venant de LUIS 
                var data = session.dialogData.tmp.response;
                
                //How
                builder.Prompts.text(session, cob + connaissance[data.entity]['when']
                + ' jj/mm/aaaa');
                
            }else{
                session.send(cob + prompts.error);
            }
        },
        function(session, results){
            //On recapitule
            // f.debug(results);
            
            if(results.response){
                //On enregistre le result
                session.dialogData.transfertWhen = results.response;
                
                // f.debug(session.dialogData);
                session.send(cob + 'Récapitulatif : \n'
                                    + '%s \n'
                                    + '%s€ \n'
                                    + '%s', session.dialogData.transfertWho.entity,
                                            session.dialogData.transfertHow,
                                            session.dialogData.transfertWhen);
                
                builder.Prompts.text(session, 'Confirmation, tapez votre mot de passe de session !');
            }else{
                session.send(cob + prompts.error);
            }
        },
        
        //Il faut securiser en envoyer un code a FS4U en attente de la rep d'ugo
        auth.checkingPassword(0),
        
        function(session, results){
            if(results.response){
                session.send(cob + "Transaction effectuée !");
            }else{
                session.send(cob + "Transaction annulée, veuillez recommencer l'opération !");
            }
        }
        
    ],
    
    //Consultations comptes
    accessMoney:[
        a.question('action'),
        
        //Identification
        ident.ident(1),
        ident.treatmentOne(),
        ident.treatmentTwo(),
        ident.treatmentThree(),
        ident.treatmentFour(),
        // //Fonction authentification
        auth.auth(),
        auth.checkingPassword(1),
        
        //Traitement
        function(session, results){
            if(results.response){
    
                var data = results.response.entity;

                if(data) data = 'compte';

                var name = session.userData.name ;
                var surname = session.userData.surname ;
                var idProp = name.concat(surname);
                
                session.dialogData.idProp = idProp;
                
                var nextStep = false;
                var nbCompte = 3;
                
                //On recherche dans la fausse bdd si idProp existe
                for(var i = 1 ; i < nbCompte; i++){
                    if(bdd.prop[i] == idProp){
                        nextStep = true;
                    }    
                }
                
                if(nextStep){
                    //recupuréré les ids des compte
                    var compteId = [];
                    
                    for(var i = 0; i < nbCompte; i++){
                        compteId[i] = bdd['prop_compte'][idProp]['id_compte_'.concat(i+1)];
                    }
                    
                    //recup les infos de chaque comptes
                    var dataCompte = [];
                    for(var i = 0; i < compteId.length; i++){
                        dataCompte[i] = bdd['comptes'][compteId[i]]['name']; 
                    }
                    
                    
                    //On liste les comptes
                    builder.Prompts.choice(session, cob + "Vos comptes : ", dataCompte);
                    
                }else{
                    session.send(cob + 'Vous n\'avez pas de comptes !');
                }
                
    
            }else{
                session.send(cob + prompts.error);
            }
        },
        
        function(session, results){
            if(results.response){
                var data = results.response.entity;
                var nbCompte = 3;
                
                //On recup les ids en regarde le bon compte
                var compteId = [];
                for(var i = 0; i < nbCompte; i++){
                        compteId[i] = bdd['prop_compte'][session.dialogData.idProp]['id_compte_'.concat(i+1)];
                        
                        if(data == bdd['comptes'][compteId[i]]['name']){
                            
                            var compte = bdd['comptes'][compteId[i]]['detail_compte'];
                            
                            var nbOp = 4;
                            
                            
                            var ope = [];
                            for(var i = 0; i < nbOp ; i++){
                                ope[i] = compte[i+1].date + ', '
                                            + compte[i+1].cause + ', '
                                            + compte[i+1].montant;
                            } 
                            
                            session.send(cob + 'Opérations effectuées: \n\n' 
                                                + ope[0] + '\n'
                                                + ope[1] + '\n'
                                                + ope[2] + '\n'
                                                + ope[3] );
                        }
                }
            }else{
               session.send(cob + prompts.error); 
            }
        }
        
    ]
}