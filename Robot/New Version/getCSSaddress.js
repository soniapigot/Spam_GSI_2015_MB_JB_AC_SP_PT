//-- RECUPERATION DES CHEMINS CSS --\\

//Importation des modules
//	Pour recuperer les arguments passes en ligne de commande
var system = require('system');
var args = system.args;
//	Pour ouvrir et traiter les informations sur une page web
var page = require('webpage').create();
//	Pour creer et modifier des fichiers
var fs = require('fs');

console.log(args[1]);
page.open(args[1], function(status) {
        if (status !== 'success') {
            console.log("echec")
            phantom.exit();
        }
        //Si l'ouverture de la page se fait correctement
        else {
            var css = page.evaluate(function () {
                //Recuperation de tous les attributs href et des balises link
                var ret = [];
                [].slice.call(document.querySelectorAll("link")).forEach(function (arg, i) {
                    ret.push(arg.getAttribute("href"));
                });
                return ret;
            });

            console.log("[getCSSaddress.js] Nb de chemin pointant vers le CSS : " + css.length);
            var contentFin = "";
            //Sauvegarde des chemins CSS dans un fichier texte
            for (var i = 0; i < css.length; i++) {
                var cssi = css[i];
                if (cssi.search(".css")>=0) {
                    var path = '\\projetoption\\adresseCSS.txt';
                    var content = cssi;
                    if(i==css.length-1){
                        contentFin+=content;
                    }
                    else {
                        contentFin += content + ",";
                    }
                }
            }
            fs.write(args[2]+path, contentFin, 'w');


            //Remplacement de withoutCSSandJS.html par la nouvelle page sans CSS et JS
            var js = page.evaluate(function ()   {
                return document;
            });
            var newAdress = js.all[0].outerHTML;
            fs.write(args[2]+"\\projetoption\\WithoutCSSandJS\\withoutCSSandJS.html", newAdress, 'w');

            phantom.exit();
        }
    }
);