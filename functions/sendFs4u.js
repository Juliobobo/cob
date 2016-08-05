//////////////////////////////////////////////////////////////////
////////////////// CODE FONCTIONNEL /////////////////////////////
////////////////////////////////////////////////////////////////
var https = require("https");

// Fonction qui envoi le code sur l'application FS4U

var sendFs4u = function(title, pseudo, password, app){
    
    // var pseudo = 'bonnardelj';
    // var app = 'fs4u';
    
    var options = {
      host: 'fscgi.com',
      port: '443',
      path: '/fwk/rest/deviceregistrations/send/' + pseudo + '/' + app,
      headers: { "Content-Type" :"application/json", 'Accept': 'application/json'},
      method: 'POST'  
    };
    
    var inputdata = JSON.stringify( {
            "description": "CodeSecure",
            "link": "",
            "message": 'Votre password: ' + password,
            "title": title,
            "userId": pseudo
      } );
    
    var req = https.request(options, function(res) {
    //   console.log('STATUS: ' + res.statusCode);
    //   console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        // console.log('Return info: ' + chunk);   // output the return raw data
      });
    });
    
    // req.on('error', function(e) {
    //   console.log('problem with request: ' + e.message);
    // });
    
    // attach input data to request body
    req.write(inputdata);
    req.end();    
};

exports.sendFs4u = sendFs4u;

// sendFs4u('banque', 'bonnardelj', '123456', 'fs4u');