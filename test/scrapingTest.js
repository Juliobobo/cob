/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var f = require('../functions/usefulFunction');
//f.scraping(function(results));
var data = [];
var scrap = f.scraping(function(err, results){
     
     return results;
});


console.log(scrap);