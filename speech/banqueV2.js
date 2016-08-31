var builder = require('botbuilder');
var prompts = require('../data/prompts');
var auth = require("../functions/auth");
var ident = require("../functions/ident");

module.exports = {
    makeMoneyTransfert:[
       
     function(session, args, next){
            
            var action = builder.EntityRecognizer.findEntity(args.entities, 'action');
            var destinataire = builder.EntityRecognizer.findEntity(args.entities, 'destinataire');
            var montant = builder.EntityRecognizer.findEntity(args.entities, 'montant');
            var devise = builder.EntityRecognizer.findEntity(args.entities, 'devise');
            var date = builder.EntityRecognizer.findEntity(args.entities, 'builtin.datetime.date');
            
            session.dialogData.action = action;
            session.dialogData.destinataire = destinataire;
            session.dialogData.montant = montant;
            session.dialogData.devise = devise;
            session.dialogData.date = date;
            
            next({response: true});
            
        },
        
        //Identification
        ident.ident(1),
        ident.treatmentOne(),
        ident.treatmentTwo(),
        ident.treatmentThree(),
        ident.treatmentFour(),
        //Fonction authentification
        auth.auth('Prelevement'),
        auth.checkingPassword(1),
        
        // Traitement
        function(session, results){
            if(results.response){
                builder.Prompts.choice(session, 'Récapitulatif : \n' 
                                    + session.dialogData.action.entity + '\n'
                                    + 'pour ' + session.dialogData.destinataire.entity + '\n'
                                    + 'de ' + session.dialogData.montant.entity 
                                    + session.dialogData.devise.entity + '\n'
                                    + 'pour ' + session.dialogData.date.entity + '\n\n ok ?', "oui|non");
            }else{
                session.send(prompts.error);
            }
        
        },
        
        //Il faut securiser en envoyer un code a FS4U en attente de la rep d'ugo
        auth.auth('Confirmation'),
        auth.checkingPassword(1),
        
        function(session, results){
            if(results.response){
                session.send("Transaction effectuée !");
            }else{
                session.send("Transaction annulée, veuillez recommencer l'opération !");
            }
        }
        
    ],
}