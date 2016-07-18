/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * On stocke ici les données du robot
 */

module.exports = {
  'nomEntreprise': {
        description: 'Groupe CGI est un groupe canadien actif dans le domaine des services en technologies de l\'information et de la communication et en gestion des processus d\'affaires.' ,
        fondateur: 'Michael E. Roach',
        localisation: 'Le siège France se trouve à la défense ! (sinon c\'est au Canada)',
        website: 'www.cgi.fr',
        activité: 'Finance ...',
        solution: 'Pleins'
    },
    
    'salutation': {
        matin : 'Bonjour, tu es matinal dis donc. Ou tu te couche tard, au choix.',
        midi: 'Salut ! Tu ne manges pas ?',
        soir: 'Salut ! Tu passes une bonne soirée ?',
        default: 'Bonjour !' 
    },
    
    'sante':{
        1: 'Etant un robot, je vais toujours bien :)',
        2: 'Moi ça va toujours, voyons !',
        3: 'On m\'a implémenté pour être toujours heureux !',
        
    },
    
    'none':{
        1: 'Ok !',
        2: 'Okayyy !',
        3: 'D\'accord'
    }
};