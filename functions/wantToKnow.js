/**
 * Fonction qui permet à cob de savoir si il sait ou pas
 **/
 var builder = require('botbuilder');
 var brain = require("../data/knowledge");
 
 module.exports = {
     
     wantToKnow : function(type){
        return function(session, results, next){
           console.log(results);
           var tmp = results;
           var know = session.userData.type = 'sport'
           
           if(!know){
             // session.beginDialog('/wantToKnow');s
           }else{
             console.log("come back");
             next({response : tmp});
           }
        };
     }
 }