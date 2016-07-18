/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = {
 
    /*
 * 
 * @param all file
 * @returns all (debug)
 */
    debug: function(file){
        console.log('-----------');
        console.log(file);
        console.log('-----------');
    },
    
    rand: function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
};