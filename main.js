/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var builder = require('botbuilder');
var connaissance = require('./data/knowledge');
var prompts = require('./data/prompts');
var f = require('./usefulFunction');
var conv = require('./conversation');
var a = require('./askAnswer');


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

//console.log(cob + 'Bonjour !');

bot.dialog('/', dialog);

dialog.onDefault(builder.DialogAction.send(cob + prompts.accueil));


//Pour de l'aide
dialog.matches('aide', '/aide');
bot.dialog('/aide', [
    function(session){
        f.debug('aide');
        builder.Prompts.text(session, cob + prompts.reponse);
    },
    function(session, results){
        debug(results.response);
        if(results.response == 1){
            session.send(cob + prompts.fonctionnement);
            next();
            
        }
        if(results.response == 2){
            session.send(cob + prompts.implementer);
//            session.endDialog();
        }
        else{
//            session.endDialog();
        }
    }
]);

/*
 * On essaie de crée un bot qui parle de tout et n'importe quoi
 * 
 */
dialog.matches('salutation', conv.salutation);
dialog.matches('sante', conv.sante);
//dialog.matches('none', conv.none); car default qui 

/* 
 * 
 * Element concernant CGI
 * 
 */

var cgi = 'nomEntreprise';

//description CGI
dialog.matches('description', [a.question(cgi), a.reponse('description')]);

//fondateur CGI
dialog.matches('fondateur', [a.question(cgi), a.reponse('fondateur')]);

//localisation CGI
dialog.matches('localisation', [a.question(cgi), a.reponse('localisation')]);

//website CGI -- contact
dialog.matches('contact', [a.question(cgi), a.reponse('website')]);

//solution CGI
dialog.matches('solution', [a.question(cgi), a.reponse('solution')]);

