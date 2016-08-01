 var builder = require('botbuilder');
 var f = require("../functions/usefulFunction");
 var prompts = require('../data/prompts');
 var bdd = require("../data/bdd");

 
 var cob = 'cob > ';
//  AIzaSyB-5brK5u1mrUsC_dcCPxt70oDWhNAzVWU

//Geolocation à la main
 var geolocation = function(){
     return function(session, results, next){

            var urlImage = 'https://maps.googleapis.com/maps/api/staticmap?center=45.193409,5.768293999999969&zoom=17&size=500x400&maptype=roadmap&markers=45.193409,5.768293999999969';
            var img = new builder.CardImage(session);
            var i = img.url(urlImage);
            session.send(cob + i + " geoloc");
            builder.Prompts.confirm(session, 'Confirmez-vous ?');
             
         // }
     }
 }
 
//  https://maps.googleapis.com/maps/api/staticmap?center=45.193409,5.768293999999969&zoom=17&size=500x400&maptype=roadmap&markers=45.193409,5.768293999999969

 exports.geolocation = geolocation;