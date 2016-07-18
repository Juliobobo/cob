/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var builder = require('botbuilder');
//var connaissance = require('./data/data');
var prompts = require('./data/prompts');

var debug = function debug(file){
    console.log('-----------');
    console.log(file);
    console.log('-----------');
};

//Je me connecte en mode console
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

//On connecte LUIS
var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=95517bc1-76fc-4d65-81a9-63456aee5245&subscription-key=e44f708e8fb2425587490ec44f9eef66&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

//Les var des deux personnes qui parle
var cob = 'cob > ';
var human = 'You > ';

console.log(cob + 'Bonjour !');

bot.dialog('/', dialog);

dialog.onDefault(builder.DialogAction.send(cob + prompts.accueil));


//Pour de l'aide
dialog.matches('aide', '/aide');
bot.dialog('/aide', [
    function(session){
        debug('aide');
        builder.Prompts.text(session, cob + prompts.reponse);
    },
    function(session, results){
        debug(results.response);
        if(results.response == 1){
            session.send(cob + prompts.fonctionnement);
            session.endDialog();
            
        }
        if(results.response == 2){
            session.send(cob + prompts.implementer);
            session.endDialog();
        }
        else{
            session.endDialog();
        }
    }
]);

/* CONCERNANT CGI
 * 
 */

//description CGI
dialog.matches('description', [
    question,
    reponse('description')
]);

//fondateur CGI
dialog.matches('fondateur', [
    question,
    reponse('fondateur')
]);

//localisation CGI
dialog.matches('localisation', [
    question,
    reponse('localisation')
]);
    

    


//Fonction question
function question(session, args, next){
    debug('Fonction question');
        
    var data = builder.EntityRecognizer.findEntity(args.entities, 'nomEntreprise');
    var bestWay;

    //Si on a la data
    if(data){
        //On essaye de trouver le meilleur résultat possible
        bestWay = builder.EntityRecognizer.findBestMatch(connaissance, data.entity);
    }else if(session.dialogData.bestWay){
        bestWay = session.dialogData.bestWay;
    }
    
    if(!bestWay){

    }else{
        next({response: bestWay});
    }
}

//Fonction reponse
function reponse(champsInfo){
    return function(session, results){
        debug('Fonction réponse');
        if(results.response){
            var data = results.response;
            session.send(cob + connaissance[data.entity][champsInfo]);
        }else{
            session.send(prompts.error);
        }
    };
}


//Les données du bot, à mettre dans un autre fichier apres
var connaissance = {
  'CGI': {
      description: 'Groupe CGI est un groupe canadien actif dans le domaine des services en technologies de l\'information et de la communication et en gestion des processus d\'affaires.' ,
      fondateur: 'Michael E. Roach',
      localisation: 'Le siège France se trouve à la défense ! (sinon c\'est au Canada)',
      website: 'www.cgi.fr',
      activité: 'Finance ...',
      solution: 'Pleins'
  }
};