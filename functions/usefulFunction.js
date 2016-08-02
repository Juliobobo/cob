/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var isValidDate =  function(string){
        
        console.log(string);
        
        var date = string;
        
        //Si string est vide return false
        if(date == "") return false;
        
        //comme je demande en jj/mm/aaaa, je split
        date = date.split("/");
        
        if(date.length != 3 || isNaN(parseInt(date[0])) 
                            || isNaN(parseInt(date[1]))
                            || isNaN(parseInt(date[2]))) return false;
                            
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        console.log(currentDate);
        console.log(year);
        console.log(date[2]);
        
        //Test de l'année
        
        
        
        
    }
    
    
// var date = isValidDate('12/12/1999');
// console.log(date);
    
    
module.exports = {
 
    debug: function(file){
        console.log('-----------');
        console.log(file);
        console.log('-----------');
    },
    
    rand: function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    },
    
    // isValidDate: function(string){
        
    //     var date = string;
        
    //     //Si string est vide return false
    //     if(date == "") return false;
        
    //     //comme je demande en jj/mm/aaaa, je split
    //     date = date.split("/");
        
    //     if(date.length != 3 || isNaN(parseInt(date[0])) 
    //                         || isNaN(parseInt(date[1]))
    //                         || isNaN(parseInt(date[2]))) return false;
                            
        
        
    // } 
};

