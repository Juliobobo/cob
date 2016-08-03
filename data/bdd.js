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
         
     },
     
     //Comptes
     comptes:{
        1: {
            name: 'Compte',
            number: 'N°04455585212258871212',
            solde: '1 900€',
            solde_tmp: '-55€',
            detail_compte : {
                1:{
                    date : '01/08/2016',
                    cause : 'VIR REC',
                    montant : '+450,00€'
    
                },
                2:{
                    date : '10/07/2016',
                    cause : 'CARTE X*****',
                    montant : '-73,00€'
                },
                3:{
                    date : '01/07/2016',
                    cause : 'VIR REC',
                    montant : '+1450,00€'
    
                },
                4:{
                    date : '10/06/2016',
                    cause : 'CARTE X*****',
                    montant : '-730,00€'
                },
                
            }
        },
        
        2: {
            name: 'Livret A',
            number: 'N°04415562258593212',
            solde: '19 900€',
            solde_tmp: '0€'
        },
        3: {
            name: 'Compte',
            number: 'N°04455655613234989213',
            solde: '100 900€',
            solde_tmp: '-5500€'
        },
        
        4: {
            name: 'PEL',
            number: 'N°04415562162116312126',
            solde: '1 090 900€',
            solde_tmp: '0€'
        },
        5: {
            name: 'PEL',
            number: 'N°04415562162116312126',
            solde: '10 090 900€',
            solde_tmp: '0€'
        },
        6: {
            name: 'Livret Cerise',
            number: 'N°04415562162116312126',
            solde: '90 900€',
            solde_tmp: '0€'
        }
     },
     
     prop_compte:{
         'julienbonnardel':{
             id_compte_1: '1',
             id_compte_2: '2',
             id_compte_3: '5'
         },
         'albannogues':{
             name: 'alban',
             surname: 'nogues',
             id_compte_1: '3',
             id_compte_2: '4',
             id_compte_3: '6'
         }
     },
     
     prop:{
         1 : 'julienbonnardel',
         2 : 'albannogues'
     }
     
 }