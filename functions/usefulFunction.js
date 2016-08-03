/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var isValidDate =  function(string){
        
        var date = string;
        
        //Si string est vide return false
        if(date == "") return false;
        
        //comme je demande en jj/mm/aaaa, je split
        date = date.split("/");
        var jj = parseInt(date[0], 10);
        var mm = parseInt(date[1], 10);
        var aa = parseInt(date[2], 10);
        
        if(date.length != 3 || isNaN(jj) || isNaN(mm) || isNaN(aa)) return false;
                            
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        
        //jj/mm/aaaa ou jj/mm/aa
        if(aa<2000) aa += 2000; //Car on est dans les années 2000
        
        //Test de l'année
        if(aa < year) return false;
        
        //test du mois en cours
        if(aa == year && mm < month + 1) return false; // ---> bizarre l'ordi me renvoi 7 au lieu de 8
        
        var fev;
        //test du jour en prenant en compte les années bisectile
        if(aa%4 == 0 && aa%100 != 0 || aa%400 == 0) fev = 29;
        else fev = 28;
        
        var nbj = new Array(31,fev,31,30,31,30,31,31,30,31,30,31);
        
        return (mm > 0 && mm < 13 && jj > 0 && jj < nbj[mm-1] + 1);
    }
 
var debug = function(file){
        console.log('-----------');
        console.log(file);
        console.log('-----------');
    }
    
var rand = function(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    

exports.isValidDate = isValidDate;
exports.debug = debug;
exports.rand = rand;