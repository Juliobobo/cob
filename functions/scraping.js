/**
 * Fonction de scraping
 **/
 
 var request = require('request'),
    cheerio = require('cheerio');
    
 module.exports = {
     /**
     * Fonction scrapping
     * @param url de la page ?
     * @return title ?
     **/
    scraping : function(callback){
        
//        console.log('En cours d\'implémentation !');
//        var url = 'https://news.google.fr/news?cf=all&hl=fr&pz=1&ned=fr&output=rss';
        var url = 'https://news.google.fr/';
        
        //Je répertorie tous les title
        var data = [];
        
        //Load the page
       request(url, function(err, resp, body){
//          console.log(err || body); 
//          console.log(resp); 
//            console.log(body);
            
            if(!err && resp.statusCode == 200){
                //Ressemble à la syntaxe jQuery
                var $ = cheerio.load(body);
         
//                $('.section').each(function(i, elem){
//                   var title = $('.esc-lead-article-title').text();
//                   var sectionName = $('.section-name').text();
//                   
//                   data[i] = {
//                       section: sectionName,
//                       title: title
//                       
//                   };
//                });

                $('h2.esc-lead-article-title').each(function(i, elem){
                    data[i] = $(this).text();                    
                });
                
                callback(null, data);
            }

            //Affichage
//            for(var i = 0; i<nTitle; i++){
//                console.log(i+1 +': '+ data[i] + '.');
//            }
        });
    }
}