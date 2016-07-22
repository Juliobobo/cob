/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var builder = require('botbuilder');
var f = require('./usefulFunction');
var connaissance = require('./data/knowledge');
var prompts = require('./data/prompts');
var a = require('./askAnswer');
var auth = require('./auth');

var cob = 'cob > ';

module.exports = {
    salutation :[
//        a.question('salutation'),
        function(session, args, next){
                console.log('Authentification');
                session.userData.name;
                if(!session.userData.name){
                    session.beginDialog('/profile');
                }else{
                    next();
                }
            },
        
        //reponse avec traitement
        function(session, results){
            f.debug('Salutation');
    
            var classe = 'salutation';
            var date = new Date();
            var heure = date.getHours();
            
            //traitement du prénom à améliorer avec une vraie fonction de traitement
            var userName = session.userData.name;
            //On le met en minuscule
            userName = userName.toLowerCase().replace();;
            //On enleve les caractères ?, ,, /, ...
            for(var i = 0; i < userName.length; i++){
                if(userName[i] == '?' || userName[i] == '!' || userName[i] == ','){
                    userName = userName.replace(userName[i], "");
                }
            }
            
            if(heure < 8){
                session.send(cob + connaissance[classe]['matin'] + ' %s', userName + " !");
            }else if(heure > 11  && heure < 14){
                session.send(cob + connaissance[classe]['midi'] + ' %s', userName + " ?");
            }else if(heure > 18){
                session.send(cob + connaissance[classe]['soir'] + ' %s', userName + " ?");
            }else{
                session.send(cob + connaissance[classe]['default']+ ' %s', userName + " !");
            }
            
            session.send(cob + prompts.accueil);
        }
    ],
    
    remerciment:[
        a.question('', 0),
        function(session, results){
            f.debug('Remerciment');
            if(results.response){
                r = f.rand(1,4);
                session.send(cob + results.response[r] );

            }
        }
    ],
    
    name: [
        a.question('pronom', 0),
        function(session, results){
            f.debug('name');            
            if(results.response){
                var data = results.response;
                
                if(data.entity == 'mon' || data.entity == 'je'){
                    if(!session.userData.name){
                        f.debug('Pas implémenté');
                        session.send(cob + 'Je ne sais pas');
//                        session.beginDialog('/profile');
                    }else{
                        session.send(cob + 'Tu t\'appelles %s !', session.userData.name);
                    }
                }
                if(data.entity == 'ton' || data.entity == 'tu'){
                    session.send(cob + 'Je m\'appelle cob !');
                }
                
            }else{
                session.send(cob + prompts.error);
            }
        }
    ],
    
    sante:[
        a.question('', 0),
        function(session, results){
            f.debug('sante');
            if (results.response){
                r = f.rand(1, 3);
                session.send(cob + results.response[r] + ' Et toi ?' );
            }else{
                session.send(cob + prompts.error);
            }
        }
    ],
    
//    //None
//    none:[
//        question(''),
//        reponse(f.rand(1, 3))
//    ]
    
    news:[
        a.question('', 1), //J'ai enlevé type = 'news'
        function(session, results, next){
            f.debug('news');
            f.debug(results);
            if(results.response){
                var data = results.response;
                builder.Prompts.text(session, cob + data['qChoice'] + '\n\n' +
                        data['1'] + '\n ou  \n' + data['all'] + '\n \n source: ' +
                        data['source']);
            }else{
                session.send(cob + prompts.error);
            }
        },
        function(session, results){
            f.debug('news2');
            if(results.response){
                var nTitle = results.response;
                
                if(nTitle == 1){
                    f.scraping(function(err, t){
                        session.send(cob + t[0]);
                    });
                }else if(nTitle == 2){
                    f.scraping(function(err, t){
                        session.send(cob + t.join("\n *"));
                    });
                }else{
                   session.send(cob + prompts.error); 
                }
            }else{
               session.send(cob + prompts.error); 
            }
        }
    ]
};