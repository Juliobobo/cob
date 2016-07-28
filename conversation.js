/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var builder = require('botbuilder');
var f = require('./functions/usefulFunction');
var connaissance = require('./data/knowledge');
var bdd = require("./data/bdd");
var prompts = require('./data/prompts');
var a = require('./functions/askAnswer');
var s = require("./functions/scraping");
var w = require("./functions/wantToKnow");
var auth = require("./functions/auth");

var cob = 'cob > ';

module.exports = {
    salutation :[
//        a.question('salutation'),
        function(session, args, next){
                console.log('Authentification');
                // session.userData.name;
                
                /**
                 * Mise en place des compteur
                 **/
                 //News
                 session.userData.checkNews = 0;
                
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
                session.send(cob + connaissance[classe]['matin'] + ' %s !', userName);
            }else if(heure > 11  && heure < 13){
                session.send(cob + connaissance[classe]['midi'] + ' %s !', userName);
            }else if(heure > 18){
                session.send(cob + connaissance[classe]['soir'] + ' %s !', userName);
            }else{
                session.send(cob + connaissance[classe]['default']+ ' %s !', userName);
            }
            
            session.send(cob + prompts.accueil);
        }
    ],
    
    remerciment:[
        a.question('', 0),
        function(session, results){
            f.debug('Remerciment');
            if(results.response){
                 var r = f.rand(1,4);
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
                var r = f.rand(1, 3);
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
                        
        //On check si on connait des pref de l'utilisateur
        w.wantToKnow('wNews'),
        w.recordOrNot('wNews'),
        
        //Reponse
        function(session, results, next){
            
            if(results.response){
                
                var data = results.response;
                
                var pref = session.userData.wNews;
                
                
                if(!pref){
                    builder.Prompts.text(session, cob + data['qChoice'] + '\n\n' +
                        data['1'] + ' ou ' + data['all'].toLowerCase() + '\n \n source: ' +
                        data['source']);    
                }else{
                    pref = pref.toLowerCase();
                    if(pref == 'tous'){
                        builder.Prompts.text(session, cob + data['qChoice'] + '\n\n' +
                        data['1'] + ' ou ' + data['all'].toLowerCase() + '\n \n source: ' +
                        data['source']);
                    }else{
                        builder.Prompts.text(session, cob + data['qChoice'] + '\n\n' +
                        data['1'] + ' ' + pref + ', ' + data['allPref'].toLowerCase() 
                         + pref + ' ou '+ data['all'].toLowerCase() 
                         + '\n \n source: ' + data['source']);    
                    }
                }
                
            }else{
                session.send(cob + prompts.error);
            }
        },
        
        function(session, results, next){
            f.debug('news2');
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
                                    session.send(cob + t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('sante', function(err, t){
                                    session.send(cob + t.join("\n *"));
                                });
                            }else{
                               nextStep = 1; 
                            }
                            break;
                            
                        case 'sport':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('sport', function(err, t){
                                    session.send(cob + t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('sport', function(err, t){
                                    session.send(cob + t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                            }
                            break;
                            
                            case 'culture':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('culture', function(err, t){
                                    session.send(cob + t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('culture', function(err, t){
                                    session.send(cob + t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                            case 'science':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('science', function(err, t){
                                    session.send(cob + t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('science', function(err, t){
                                    session.send(cob + t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                            case 'economie':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('economie', function(err, t){
                                    session.send(cob + t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('economie', function(err, t){
                                    session.send(cob + t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                            case 'international':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('international', function(err, t){
                                    session.send(cob + t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('international', function(err, t){
                                    session.send(cob + t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                            case 'une':
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('une', function(err, t){
                                    session.send(cob + t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('une', function(err, t){
                                    session.send(cob + t.join("\n *"));
                                });
                            }else{
                               nextStep = 1;
                                
                            }
                            break;
                            
                        default:
                            if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                                s.scraping('', function(err, t){
                                    session.send(cob + t[0]);
                                });
                            }else if(nTitle == 'toutes'){
                                s.scraping('', function(err, t){
                                    session.send(cob + t.join("\n *"));
                                });
                            }
                    }
                }else{
                    if(nTitle == 'laderniere' || nTitle == 'ladernierenews'){
                        s.scraping('', function(err, t){
                            session.send(cob + t[0]);
                        });
                    }else if(nTitle == 'toutes'){
                        s.scraping('', function(err, t){
                            session.send(cob + t.join("\n *"));
                        });
                    }else{
                      session.send(cob + prompts.error); 
                    }
                }
                
                if(nextStep == 1){
                    s.scraping('', function(err, t){
                            session.send(cob + t.join("\n *"));
                    });
                }
            }else{
               session.send(cob + prompts.error); 
            }
        },
    ], 
    
    makeMoneyTransfert:[
        a.question('action', 1),
        
        //Fonction authentification
        auth.auth(),
        auth.checkingPassword(1),
        
        // Traitement
        function(session, results){
            f.debug('Effectuer un virement');
            // f.debug(results);
            
            session.send(cob + 'Bienvenue %s dans l\'espace "Effectuer un virement"', session.userData.name);
            
            if(results.response){
                var data = results.response;
                
                //Who
                builder.Prompts.choice(session, cob + connaissance[data.entity]['who'], bdd['destinataire']);
                
                // A TROUVER : CHANGER LE I DIDN'T UNDERSTAND QUAND IL Y A UNE ERREUR
                // MODIFIER LES PROMPTS
                
            }else{
              session.send(cob + prompts.error); 
            }
        },
        function(session, results){
            // f.debug(results);
            
            if(results.response){
                
                var infoDest = bdd['destinataire'][results.response.entity];
                
                
                session.send(cob + 'Titulaire: %(titulaire)s \n '
                                   + 'Domiciliation: %(domiciliation)s \n'
                                   + 'Référence Bancaire: %(refBancaire)s \n'
                                   + 'IBAN: %(IBAN)s \n'
                                   + 'BIC: %(BIC)s \n'
                                   + 'Banque: %(banque)s' , infoDest );
                
                //On enregistre le result
                session.dialogData.transfertWho = results.response;
                
                //Results venant de LUIS 
                var data = session.dialogData.tmpPw.response;
                
                //How
                builder.Prompts.number(session, cob + connaissance[data.entity]['how']);
                
            }else{
                session.send(cob + prompts.error);
            }
        },
        function(session, results){
            // f.debug(results);
            
            if(results.response){
                //On enregistre le result
                session.dialogData.transfertHow = results.response;
                
                //Results venant de LUIS 
                var data = session.dialogData.tmpPw.response;
                
                //How
                builder.Prompts.text(session, cob + connaissance[data.entity]['when']
                + ' jj/mm/aaaa');
                
            }else{
                session.send(cob + prompts.error);
            }
        },
        function(session, results){
            //On recapitule
            // f.debug(results);
            
            if(results.response){
                //On enregistre le result
                session.dialogData.transfertWhen = results.response;
                
                // f.debug(session.dialogData);
                session.send(cob + 'Récapitulatif : \n'
                                    + '%s \n'
                                    + '%s€ \n'
                                    + '%s', session.dialogData.transfertWho.entity,
                                            session.dialogData.transfertHow,
                                            session.dialogData.transfertWhen);
                
                builder.Prompts.text(session, 'Confirmation, tapez votre mot de passe de session !');
            }else{
                session.send(cob + prompts.error);
            }
        },
        
        //Il faut securiser en envoyer un code a FS4U en attente de la rep d'ugo
        auth.checkingPassword(0),
        
        function(session, results){
            if(results.response){
                session.send(cob + "Transaction effectuée !");
            }else{
                session.send(cob + "Transaction annulée, veuillez recommencer l'opération !");
            }
        }
        
    ]
};