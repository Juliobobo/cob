/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * On stocke ici les données du robot
 */

module.exports = {
  'cgi': {
        description: 'Groupe CGI est un groupe canadien actif dans le domaine des services en technologies de l\'information et de la communication et en gestion des processus d\'affaires.' ,
        fondateur: 'Michael E. Roach',
        localisation: 'Le siège France se trouve à la défense ! (sinon c\'est au Canada)',
        website: 'www.cgi.fr',
        activité: 'Finance ...',
        solution: 'Pleins'
    },
    
    'salutation': {
        matin : 'Bonjour, tu es matinal dis donc. Ou tu te couche tard, au choix, hein',
        midi: 'Salut ! J\'espère que tu as mangé',
        soir: 'Bonsoir',
        default: 'Bonjour' 
    },
    
    'remerciment': {
        1: 'No problem !',
        2: 'Je suis gentil par nature donc je te réponds ...',
        3: 'Je t\'en pris !',
        4: 'Pas de soucis !'
    },
    
    'sante':{
        1: 'Etant un robot, je vais toujours bien :)',
        2: 'Moi ça va toujours, voyons !',
        3: 'On m\'a implémenté pour être toujours heureux !'
    },
    
    'none':{
        1: 'Ok !',
        2: 'Okayyy !',
        3: 'D\'accord'
        
    },
    
    'ton':{},
    'tu':{},
    'mon':{},
    'je':{},
    
    'news':{
        qChoice: 'Que voulez vous ?',
        1: 'La dernière news',
        all:'Toutes les news du moments',
        allPref: 'Toutes les news à propos de ',
        source: 'https://news.google.fr'
    },
    
    'politesse': {
        presentation: 'Quand on est poli on dit bonjour !'
    },
    
    //Connaissance pour la fonction wanToKnow
    'dontKnow': {
        wantToKnow: 'J\'aimerais mieux te connaitre !'
    },
    
    'know':{
        know : 'Je te connais mieux que tu crois !'
    },
    
    'wNews': {
        choice : 'Tous/sport/santé/economie/News à la une',
        kNews : 'Tu préfères les news '
    }
};