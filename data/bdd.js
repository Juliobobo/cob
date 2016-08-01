/**
 * Fausse base de donnée
 **/
 
 module.exports = {
      destinataire : {
         'Alban' : {
             id: 1,
             titulaire: 'Mr Alban NOGUES',
             domiciliation : '03020',
             refBancaire: '30003 03020 00050123456 78',
             IBAN : 'FR76 ********************',
             BIC : 'SOGEFRPP',
             banque: 'Société Général'
         },
         
         'Stéphane' : {
             id: 2,
             titulaire: 'Mr Stéphane HOUIN',
             domiciliation : '03020',
             refBancaire: '30003 03020 00050123456 78',
             IBAN : 'FR76 ********************',
             BIC : 'SOGEFRPP',
             banque: 'Société Général'
         },
         
         'Ugo' : {
             id: 3,
             titulaire: 'Mr Ugo PARLANGE',
             domiciliation : '03020',
             refBancaire: '30003 03020 00050123456 78',
             IBAN : 'FR76 ********************',
             BIC : 'SOGEFRPP',
             banque: 'Société Général'
         },
         
         'Julien' : {
             id: 4,
             titulaire: 'Mr Julien BONNARDEL',
             domiciliation : '03020',
             refBancaire: '30003 03020 00050123456 78',
             IBAN : 'FR76 ********************',
             BIC : 'SOGEFRPP',
             banque: 'Société Général'
         },
     },
     
     location : {
         'current': {
             lat: 45.193409,
             long : 5.768293999999969
         }
     },
     
     //Assurance
     assure : {
         1: {
             name: 'paul',
             surname: 'durant',
             depannage: true,
         },
         
         2: {
             name: 'julien',
             surname: 'bonnardel',
             depannage: false,
         }
         
     }
 }