/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var builder = require('botbuilder');
var restify = require('restify');
var prompts = require('./data/prompts');
var f = require('./functions/usefulFunction');
var conv = require('./speech/conversation');
var a = require('./functions/askAnswer');
var brain = require("./data/knowledge");
var fs = require("fs");
var ass = require("./speech/assurance");
var bank = require("./speech/banque");

//=========================================================
// Bot Setup
//=========================================================

// appID : ac71f72c-2c77-40f4-af7b-c4931f8110ed
// appPassword : DrjiLpupErtsdqSYDgcMTVx

//=========================================================

// Setup Restify Server
var server = restify.createServer({
  certificate: fs.readFileSync("https/server.crt.pem"),
  key: fs.readFileSync("https/server.key.pem"),
  name: "cob",
});

server.listen(10443, function(){
	console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector({
	appId: "ac71f72c-2c77-40f4-af7b-c4931f8110ed",
	appPassword: "DrjiLpupErtsdqSYDgcMTVx"
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

/**
 * Mode console
 **/
//Je me connecte en mode console
// var connector = new builder.ConsoleConnector().listen();
// var bot = new builder.UniversalBot(connector);

//=========================================================

//=========================================================
// Luis Setup
//=========================================================

//On connecte LUIS
var model = process.env.model || 'https://api.projectoxford.ai/luis/v1/application?id=95517bc1-76fc-4d65-81a9-63456aee5245&subscription-key=e44f708e8fb2425587490ec44f9eef66&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

//=========================================================

//Les var des deux personnes qui parle
var cob = 'cob > ';
var human = 'You > ';

//console.log(cob + 'Bonjour !');

/**
 * Point d'entrée de la conversation 
 **/
bot.dialog('/', dialog);
/************************************************/

/**
 * Réponse par défaut de cob 
 **/
dialog.onDefault(builder.DialogAction.send(cob + prompts.accueil));
/************************************************/

//Pour de l'aide
//dialog.matches('aide', '/aide');
//bot.dialog('/aide', [
//    function(session){
//        f.debug('aide');
//        builder.Prompts.text(session, cob + prompts.reponse);
//    },
//    function(session, results){
//        debug(results.response);
//        if(results.response == 1){
//            session.send(cob + prompts.fonctionnement);
//            next();
//            
//        }
//        if(results.response == 2){
//            session.send(cob + prompts.implementer);
////            session.endDialog();
//        }
//        else{
////            session.endDialog();
//        }
//    }
//]);

/**
 * On essaie de crée un bot qui parle de tout et n'importe quoi
 **/
dialog.matches('salutation', conv.salutation);
// dialog.matches('sante', conv.sante); ----> Bug dans Luis
//dialog.matches('none', conv.none); car default qui 

/**
 * Demande de name 
 **/
dialog.matches('name', conv.name);
/************************************************/

/**
 * remerciment
 **/
dialog.matches('remerciment', conv.remerciment);
/************************************************/

/**
 * Pour les news
 **/
dialog.matches('news', conv.news);
/************************************************/

/**
 * Description cob ou user
 **/
// dialog.matches('ego', conv.ego); existe sur luis met n'est pas implémenté
/************************************************/

/**
 * Assurance 
 **/
dialog.matches('event', ass.assurance); 
/************************************************/

/**
 * Effectuer un virement 
 **/
dialog.matches('makeMoneyTransfert', bank.makeMoneyTransfert); 
/************************************************/

/**
 * Voir ces virements 
 **/
// dialog.matches('accessMoneyTransfert', conv.accessMoneyTransfert); 
/************************************************/


/** 
 * Element concernant CGI --> check luis 
 **/

// var cgi = 'nomEntreprise';

// //description CGI
// dialog.matches('description', [a.question(cgi), a.reponse('description')]);

// //fondateur CGI
// dialog.matches('fondateur', [a.question(cgi), a.reponse('fondateur')]);

// //localisation CGI
// dialog.matches('localisation', [a.question(cgi), a.reponse('localisation')]);

// //website CGI -- contact
// dialog.matches('contact', [a.question(cgi), a.reponse('website')]);

// //solution CGI
// dialog.matches('solution', [a.question(cgi), a.reponse('solution')]);
/************************************************/

