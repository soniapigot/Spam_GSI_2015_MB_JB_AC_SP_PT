//-- RECUPERATION DU CSS --\\

//Importation des modules
//	Pour recuperer le DOM de la page sans executer le JS et le CSS
var cheerio = require("cheerio");
//	Pour envoyer une requete
var request = require("request");
//	Pour creer et modifier des fichiers
var fs = require('fs');
//	Pour creer et modifier des dossiers
var mkdirp = require('mkdirp');

//Lecture du fichier qui contient le chemin vers le css
var adressecss = fs.readFile(process.argv[3]+"\\projetoption\\adresseCSS.txt",'utf8',function(err,data){
    if (err){return;}
    if(data.length==0){
      console.log("[getCSScode.js] Pas de chemin relatif pour le CSS.");
      return;
    }

    //Si la page s'ouvre correctement et qu'il existe des chemins pour le CSS
    datas = data.split(",");
    for (var i=0; i<datas.length;i++) {
        //Pas de traitement si chemin d'accès au CSS complet
        if (datas[i][0]<='z' && datas[i][0]>='a') {}
        //Si l'adresse est relative, un traitement est effectue
        else {
            var tempData = datas[i];
            var k = 0;
            while (k<tempData.length && !(tempData[k]<='z' || tempData[k]>='a')){
                k++;
            }

            var tailleData = tempData.length;
            var j = 1;

            //Les chemins relatids d'acces au CSS sont tronques pour avoir quelque chose du type "./css/style.css"
            while (j <= tailleData && tempData[tailleData - j] != "/") {
                j++;
            }
            tempData = tempData.substring(k, tailleData - j + 1);
            console.log("tempData : " + tempData);
            mkdirp(process.argv[3] + "\\projetoption\\withoutJS" + tempData, function (err) {
                if (err) throw err;
            });
            console.log("[getCSScode.js] Ensemble chemins CSS : " + datas[i]);

            //Adresse de la page a traiter
            var cible = process.argv[2];
            if (cible[0] == 'h') {
                var taille = cible.length;
                var l = 8;
                //L'URL initiale est coupe jusqu'a avoir l'adresse apres laquelle concatener les "./css/style.css" et autres
                while (l <= taille && cible[l] != "/") {
                    l++;
                }
                cible = cible.substring(0, l+1);
                cible = cible + datas[i];
                console.log("[getCSScode.js] URL initiale tronquee : " + cible);

                //Lancement requetes pour recuperer et ecrire le CSS
                request(cible, function (error, response, html) {
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);
                        var a = $.html();
                        fs.writeFile(process.argv[3] + "\\projetoption\\withoutJS" + datas[i].substring(k, data.length), a);
                        console.log("[getCSScode.js] Ecriture fichier OK.");
                    } else {
                        console.log("[getCSScode.js] Ecriture fichier erreur.");
                    }
                });
            }

            else{
                console.log(cible);
                var taille = cible.length;
                var i = 0;
                //L'URL initiale est coupe jusqu'a avoir l'adresse apres laquelle concatener les "./css/style.css" et autres
                while (i <= taille && cible[i] != "/") {
                    i++;
                }
                cible = cible.substring(0, i);
                cible = cible + datas[i];
                console.log("cible: " + cible);

                //Lancement requetes pour recuperer et ecrire le CSS
                request(cible, function (error, response, html) {
                    if (!error && response.statusCode == 200) {
                        var $ = cheerio.load(html);
                        var a = $.html();
                        fs.writeFile(process.argv[3] + "\\projetoption\\withoutJS" + datas[i].substring(k, data.length), a);
                        console.log("[getCSScode.js] Ecriture fichier OK.");
                    } else {
                        console.log("[getCSScode.js] Ecriture fichier erreur.");
                    }
                });
            }

        }
    }
});