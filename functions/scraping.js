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
    scraping : function(choice ,callback){
        
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
            
            //On categorise    
            var taille = data.length;
            var cat = [];
            
            
            if(taille != 0){
                if(choice == 'une'){
                    for(var i = 0; i<taille%28; i++){
                       cat[i] = data[i];
                    } 
                }else if(choice == 'international'){
                   for(var i = 6; i<6+(taille%30); i++){
                       cat[i - 6] = data[i];
                   }
                }else if(choice == 'economie'){
                   for(var i = 11; i<11+taille%30; i++){
                       cat[i - 11] = data[i];
                   }
                }else if(choice == 'science'){
                   for(var i = 16; i<16+taille%30; i++){
                       cat[i - 16] = data[i];
                   }
                }else if(choice == 'culture'){
                   for(var i = 21; i<21+taille%30; i++){
                       cat[i - 21] = data[i];
                   }
                }else if(choice == 'sport'){
                   for(var i = 26; i<26+taille%30; i++){
                       cat[i - 26] = data[i];
                   }
                }else if(choice == 'sante'){
                   for(var i = 30; i<30+taille%30; i++){
                       cat[i - 30] = data[i];
                   }
                }else{
                    cat = data;
                }
            }else{
                console.log('Error');
            }        
                
                callback(null, cat);
            }

            //Affichage
//            for(var i = 0; i<nTitle; i++){
//                console.log(i+1 +': '+ data[i] + '.');
//            }
            
        });
    }
}