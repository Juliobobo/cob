/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = require("../app");
var builder = require('botbuilder');
var f = require('../functions/usefulFunction');
var connaissance = require('../data/knowledge');
var bdd = require("../data/bdd");
var prompts = require('../data/prompts');
var a = require('../functions/askAnswer');
var s = require("../functions/scraping");
var w = require("../functions/wantToKnow");
var auth = require("../functions/auth");
var ident = require("../functions/ident");


module.exports = {
    salutation :[
//        a.question('salutation'),
        // ident.ident(1),
        // ident.treatmentName(),
        // ident.treatmentSurname(),
        function(session, args, next){
                // console.log('identification');
                // session.dialogData.name;
                
                /**
                 * Mise en place des compteur
                 **/
                 //News
                 session.dialogData.checkNews = 0;
                 
                 next();
            },
        
        //reponse avec traitement
        function(session, results){
            // f.debug('Salutation');
            
            
            if(!session.dialogData.name){
                session.send('Bonjour, ' + prompts.accueil.toLowerCase());    
            }else{
                var classe = 'salutation';
                var date = new Date();
                var heure = date.getHours();
                
                //traitement du prénom à améliorer avec une vraie fonction de traitement
                var userName = session.dialogData.name;
                //On le met en minuscule
                userName = userName.toLowerCase().replace();;
                //On enleve les caractères ?, ,, /, ...
                for(var i = 0; i < userName.length; i++){
                    if(userName[i] == '?' || userName[i] == '!' || userName[i] == ','){
                        userName = userName.replace(userName[i], "");
                    }
                }
                
                if(heure < 8){
                    session.send(connaissance[classe]['matin'] + ' %s !', userName);
                }else if(heure > 11  && heure < 13){
                    session.send(connaissance[classe]['midi'] + ' %s !', userName);
                }else if(heure > 18){
                    session.send(connaissance[classe]['soir'] + ' %s !', userName);
                }else{
                    session.send(connaissance[classe]['default']+ ' %s !', userName);
                }
                
                session.send(prompts.accueil);    
            }
            
        }
    ],
    
    remerciment:[
        a.question(''),
        function(session, results){
            // f.debug('Remerciment');
            if(results.response){
                 var r = f.rand(1,4);
                session.send(results.response[r] );

            }
        }
    ],
    
    name: [
        a.question('pronom'),
        function(session, results){
            // f.debug('name');            
            if(results.response){
                var data = results.response;
                
                if(data.entity == 'mon' || data.entity == 'je'){
                    if(!session.userData.name){
                        // f.debug('Pas implémenté');
                        session.send('Je ne sais pas');
//                        session.beginDialog('/profile');
                    }else{
                        session.send('Tu t\'appelles %s !', session.userData.name);
                    }
                }
                if(data.entity == 'ton' || data.entity == 'tu'){
                    session.send('Je m\'appelle cob !');
                }
                
            }else{
                session.send(prompts.error);
            }
        }
    ],
    
    sante:[
        a.question(''),
        function(session, results){
            // f.debug('sante');
            if (results.response){
                var r = f.rand(1, 3);
                session.send(results.response[r] + ' Et toi ?' );
            }else{
                session.send(prompts.error);
            }
        }
    ],
    
//    //None
//    none:[
//        question(''),
//        reponse(f.rand(1, 3))
//    ]
    
    news:[
        a.question(''), //J'ai enlevé type = 'news'
                        
        //On check si on connait des pref de l'utilisateur
        w.wantToKnow('wNews'),
        w.recordOrNot('wNews'),
        
        //Reponse
        function(session, results, next){
            
            if(results.response){
                
                var data = results.response;
                
                var pref = session.userData.wNews;
                
                
                if(!pref){
                    builder.Prompts.text(session, data['qChoice'] + '\n\n' +
                        data['1'] + ' ou ' + data['all'].toLowerCase() + '\n \n source: ' +
                        data['source']);    
                }else{
                    pref = pref.toLowerCase();
                    if(pref == 'tous'){
                        builder.Prompts.text(session, data['qChoice'] + '\n\n' +
                        data['1'] + ' ou ' + data['all'].toLowerCase() + '\n \n source: ' +
                        data['source']);
                    }else{
                        builder.Prompts.text(session, data['qChoice'] + '\n\n' +
                        data['1'] + ' ' + pref + ', ' + data['allPref'].toLowerCase() 
                         + pref + ' ou '+ data['all'].toLowerCase() 
                         + '\n \n source: ' + data['source']);    
                    }
                }
                
            }else{
                session.send(prompts.error);
            }
        },
        
        function(session, results, next){
            // f.debug('news2');
            if(results.response){
                var nTitle = results.response;
                
                nTitle = nTitle.replace(/ /g, '').replace(/é/g,'e').replace(/è/g,'e')
                                .toLowerCase();
                
                // f.debug(nTitle);
                
                var wNews = session.userData.wNews;
                var nextStep = 0;
                
                if(wNews){
                    switch (wNews) {
                        case 'sante':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('sante', function(err, t){
                                    session.send(t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('sante', function(err, t){
                                    session.send(t.join("\n *"));
                                });
                            }else{
                               nextStep = 1; 
                            }
                            break;
                            
                        case 'sport':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('sport', function(err, t){
                                    session.send(t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('sport', function(err, t){
                                    session.send(t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                            }
                            break;
                            
                            case 'culture':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('culture', function(err, t){
                                    session.send(t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('culture', function(err, t){
                                    session.send(t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                            case 'science':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('science', function(err, t){
                                    session.send(t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('science', function(err, t){
                                    session.send(t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                            case 'economie':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('economie', function(err, t){
                                    session.send(t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('economie', function(err, t){
                                    session.send(t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                            case 'international':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('international', function(err, t){
                                    session.send(t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('international', function(err, t){
                                    session.send(t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                            case 'une':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('une', function(err, t){
                                    session.send(t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('une', function(err, t){
                                    session.send(t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                        default:
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('', function(err, t){
                                    session.send(t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('', function(err, t){
                                    session.send(t.join("\n *"));
                                });
                            }
                    }
                }else{
                    if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                        s.scraping('', function(err, t){
                            session.send(t[0]);
                        });
                    }else if(nTitle == 'toutes'){
                        s.scraping('', function(err, t){
                            session.send(t.join("\n *"));
                        });
                    }else{
                      session.send(prompts.error);
                    }
                }
                
                if(nextStep == 1){
                    s.scraping('', function(err, t){
                            session.send(t.join("\n *"));
                    });
                }
            }else{
               session.send(prompts.error); 
            }
        },
    ]
};