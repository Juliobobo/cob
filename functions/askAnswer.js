/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var builder = require('botbuilder');
var f = require('../functions/usefulFunction');
var connaissance = require('../data/knowledge');
var prompts = require('../data/prompts');

var cob = 'cob > ';

module.exports = {
    /**
     * Fonction question avec authentication
     * si auth = 1 on doit connaitre le prenom
     * si auth = 0 on s'en fiche
     **/
    question: function(type){
        return function(session, args, next){
            // session.userData.name = 'Julien';
            // f.debug('Fonction question');
            var data = builder.EntityRecognizer.findEntity(args.entities,type);
            var bestWay;
            //Si on a la data
            if(data){
                //On essaye de trouver le meilleur résultat possible
                bestWay = builder.EntityRecognizer.findBestMatch(connaissance, data.entity);
            }else if(session.dialogData.bestWay){
                bestWay = session.dialogData.bestWay;
            }
            if(!bestWay){
                next({response: connaissance[args.intent]});
            }else{
                next({response: bestWay});
            }
        
        };
    }, 

    //Fonction reponse standard

    reponse: function(champsInfo){
        return function(session, results){
            // f.debug('Reponse standard');
            if(results.response){
                var data = results.response;
                session.send(cob + connaissance[data.entity][champsInfo]);
            }else{
                session.send(cob + prompts.error);
            }
        };
    }
};