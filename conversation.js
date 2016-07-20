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

var cob = 'cob > ';

module.exports = {
    salutation :[
        a.question('salutation'), 
        
        //reponse avec traitement
        function(session, results){
            f.debug('Salutation');
            if(results.response){
                
                var data = results.response;
                var date = new Date();
                var heure = date.getHours();
                
                if(heure < 8){
                    session.send(cob + connaissance[data.entity]['matin']);
                }else if(heure > 11  && heure < 14){
                    session.send(cob + connaissance[data.entity]['midi']);
                }else if(heure > 18){
                    session.send(cob + connaissance[data.entity]['soir']);
                }else{
                    session.send(cob + connaissance[data.entity]['default']);
                }
                
            }else{
                session.send(cob + prompts.error);
            }
        }
    ],
    
    sante:[
        a.question(''),
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
        a.question('info'),
        function(session, results, next){
            f.debug('news');
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