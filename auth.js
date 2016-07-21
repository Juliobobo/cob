/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var connaissance = require('./data/knowledge');
var a = require('./usefulFunction');

var cob = 'cob > ';

module.exports = {
    /**
     * Fonction d'authentification
     * si auth = 1 on doit connaitre le prenom
     * si auth = 0 on s'en fiche
     **/
    auth : function(type, auth){
        return function(session){

            if(!session.userData.name && auth == 1){
                session.send(cob + connaissance['politesse']['presentation']);
            }else{
              
            }
        };
        
    }
};
