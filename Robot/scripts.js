/**
 * Created by Pierre on 14/11/2015.
 */
// Recupere le CSS
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');
//on lit le fichier qui contient les adresses des liens vers les css
var adressecss = fs.readFile(process.argv[3]+"\\adressecss.txt"
    ,'utf8',function(err,data){

        console.log(data);
        if (err) throw err;
        //toujours ce fameux argv[2]! cf robotAvecCheerio.js
        var cible = process.argv[2];
        console.log(cible);
        var taille = cible.length;
        var i = 1;
        //on coupe l'URL initiale jusqu'a avoir l'adresse apres laquelle concatener les "./css/style.css" et autres
        while(i<=taille && cible[taille-i]!="/"){
            i++;
        }
        cible = cible.substring(0,taille-i+1);
        cible=cible+data;
        console.log(cible);
        //on fait des requetes pour recuperer et ecrire le css
        request(cible, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var a = $.html();
                fs.writeFile(process.argv[3]+"\\b\\"+data,a);
                console.log('done');
            }
            else {
                console.log("echec");
            }
        });

    });
console.log(adressecss);




