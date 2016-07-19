/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var request = require('request'),
    cheerio = require('cheerio');

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
    },
    
/**
 * Fonction scrapping
 * @param url de la page ?
 * @return title ?
 **/
    scraping : function(){
        
        console.log('En cours d\'implémentation !');
//        var url = 'https://news.google.fr/news?cf=all&hl=fr&pz=1&ned=fr&output=rss';
        var url = 'https://news.google.fr/';
        
        //Je répertorie tous les title
        var data = {};
        var sections = [];
        
        //Load the page
        request(url, function(err, resp, body){
//          console.log(err || body); 
//          console.log(resp); 
//            console.log(body);
            
            if(!err && resp.statusCode == 200){
                //Ressemble à la syntaxe jQuery
                var $ = cheerio.load(body);
         
                $('.section').each(function(i, elem){
                   var title = $('.esc-lead-article-title').text();
                   var sectionName = $('.section-name').text();
                   
                   data[i] = {
                       section: sectionName,
                       title: title
                       
                   };
                });
            }
            
            // on enleve le each et on test la section par exemple
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
//            for(var i = 0; i<titles.length; i++){
//                console.log(sections[i]);
//            }
//            console.log(sections.length);
            
            //Affichage tableau
//            for(var i = 0; i<titles.length; i++){
//                console.log(titles[i]);
//            }
            
            console.log(data);
        });
        
    }
};