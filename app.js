/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var builder = require('botbuilder');
var restify = require('restify');
var prompts = require('./data/prompts');
var f = require('./functions/usefulFunction');
var conv = require('./conversation');
var a = require('./functions/askAnswer');
 var brain = require("./data/knowledge");

//=========================================================
// Bot Setup
//=========================================================

/**
 * Tentative de chat html / nodejs 
 **/
// DrjiLpupErtsdqSYDgcMTVx
//=========================================================

// Setup Restify Server
//var server = restify.createServer();
//server.listen(process.env.port || process.env.PORT || 3978, function () {
  //console.log('%s listening to %s', server.name, server.url); 
//});


// Create chat bot
//var connector = new builder.ChatConnector({
//    appId: process.env.MICROSOFT_APP_ID,
//    appPassword: process.env.MICROSOFT_APP_PASSWORD
//});
//var bot = new builder.UniversalBot(connector);
//server.post('/api/messages', connector.listen());

/**
 * Code d'alban
 * N'est plus fonctionnel
 **/

//var connector = new builder.ChatConnector({
//   appId: 'cob',
//   appPassword: 'cgi'
//});
//
//var bot = new builder.UniversalBot(connector);
//
//// Setup Restify Server
//var server = restify.createServer();
//server.post('/api/messages', connector.listen());
//server.listen(process.env.port || 3978, function () {
//    console.log('%s listening to %s', server.name, server.url); 
//});
//

/**
 * Mode console
 **/
//Je me connecte en mode console
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

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
 *Demande le prénom
 *
 * A revoir !!!!
 **/
bot.dialog('/profile', [
   function(session){
       builder.Prompts.text(session, cob + 'Bonjour! Comment vous appelez-vous ?');
   },
   function(session, results){
       session.userData.name = results.response;
       session.endDialog();
   }
]);
/************************************************/


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
dialog.matches('sante', conv.sante);
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
 * Effectuer un virement 
 **/
dialog.matches('makeMoneyTransfert', conv.makeMoneyTransfert); 
/************************************************/

/**
 * Voir ces virements 
 **/
// dialog.matches('accessMoneyTransfert', conv.accessMoneyTransfert); 
/************************************************/


/** 
 * Element concernant CGI 
 **/

var cgi = 'nomEntreprise';

//description CGI
dialog.matches('description', [a.question(cgi, 0), a.reponse('description')]);

//fondateur CGI
dialog.matches('fondateur', [a.question(cgi, 0), a.reponse('fondateur')]);

//localisation CGI
dialog.matches('localisation', [a.question(cgi, 0), a.reponse('localisation')]);

//website CGI -- contact
dialog.matches('contact', [a.question(cgi, 0), a.reponse('website')]);

//solution CGI
dialog.matches('solution', [a.question(cgi, 0), a.reponse('solution')]);
/************************************************/

