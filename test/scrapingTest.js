/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var f = require('../functions/scraping');
f.scraping('',function(err, res){
   console.log(res.length);
   for(var i = 0; i<res.length; i++){
       console.log(res[i]);
   }
});

f.scraping('sport',function(err, res){
   console.log(res.length);
   for(var i = 0; i<res.length; i++){
       console.log(res[i]);
   }
});
