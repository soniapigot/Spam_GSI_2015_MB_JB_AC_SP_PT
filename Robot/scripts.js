/**
 * Created by Pierre on 14/11/2015.
 */
// Recupere le CSS
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');
var mkdirp = require('mkdirp');
//on lit le fichier qui contient les adresses des liens vers les css
var adressecss = fs.readFile(process.argv[3]+"\\projetoption\\adressecss.txt",'utf8',function(err,data){
    //if (err) throw err;
    if (err){return ;}
    datas = data.split(",");
    for (var i=0; i<datas.length;i++) {


        if (datas[i][0]<='z' && datas[i][0]>='a') {


        }
        else {
            var tempData = datas[i];
            var k = 0;
            while (k<tempData.length && !(tempData[k]<='z' || tempData[k]>='a')){
                k++;
            }

            var tailleData = tempData.length;
            var j = 1;

            //on coupe l'URL initiale jusqu'a avoir l'adresse apres laquelle concatener les "./css/style.css" et autres


            while (j <= tailleData && tempData[tailleData - j] != "/") {
                j++;
            }
            tempData = tempData.substring(k, tailleData - j + 1);
            console.log("tempData : " + tempData);
            mkdirp(process.argv[3] + "\\projetoption\\b" + tempData, function (err) {
                // path was created unless there was error
                if (err) throw err;
            });
            console.log("data " + datas[i]);
            //toujours ce fameux argv[2]! cf robotAvecCheerio.js

            var cible = process.argv[2];
            if (cible[0] == 'h') {
                console.log(cible);
                var taille = cible.length;
                var i = 8;
                //on coupe l'URL initiale jusqu'a avoir l'adresse apres laquelle concatener les "./css/style.css" et autres
                while (i <= taille && cible[i] != "/") {
                    i++;
                }
                cible = cible.substring(0, i);
                cible = cible + datas[i];
                console.log("cible: " + cible);

                //on fait des requetes pour recuperer et ecrire le css
                request(cible, function (error, response, html) {
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);
                        var a = $.html();
                        fs.writeFile(process.argv[3] + "\\projetoption\\b" + datas[i].substring(k, data.length), a);
                        console.log('done');
                    } else {
                        console.log("echec");
                    }
                });
            }

            else{
                console.log(cible);
                var taille = cible.length;
                var i = 0;
                //on coupe l'URL initiale jusqu'a avoir l'adresse apres laquelle concatener les "./css/style.css" et autres
                while (i <= taille && cible[i] != "/") {
                    i++;
                }
                cible = cible.substring(0, i);
                cible = cible + datas[i];
                console.log("cible: " + cible);

                //on fait des requetes pour recuperer et ecrire le css
                request(cible, function (error, response, html) {
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);
                        var a = $.html();
                        fs.writeFile(process.argv[3] + "\\projetoption\\b" + datas[i].substring(k, data.length), a);
                        console.log('done');
                    } else {
                        console.log("echec");
                    }
                });
            }

        }
    }
});




