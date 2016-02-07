//-- SUPPRESSION BALISES RELATIVES AU CSS --\\

//Importation des modules
//	Pour recuperer les arguments places en ligne de commande
var system = require('system');
var args = system.args;
//	Pour ouvrir et traiter les donnees de la page
var page = require('webpage').create();
//	Pour creer et modifier des fichiers
var fs = require('fs');

var target = args[1]+args[2]+"/"+args[2]+".html";
page.open(target, function(status) {
    console.log("[removeCSS.js] Fichier cible : "+target);
    if (status != "success") {
        console.log("[removeCSS.js] Ouverture fichier echec.");
        phantom.exit();
    }
    else {
        page.evaluate(function () {
            //Suppression des balises style
            [].slice.call(document.querySelectorAll("style")).forEach(function (arg, i) {
                var node = arg;
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            });
            //Suppression des attributs style
            [].slice.call(document.querySelectorAll("*")).forEach(function (arg, i) {
                if (arg.getAttribute("style")) {
                    arg.removeAttribute("style");
                }
            });
        });

        var js = page.evaluate(function () {
            return document;
        });
        var newAdress = js.all[0].outerHTML;
        fs.write(args[3] + "\\projetoption\\" + args[2] + "\\" + args[2] + ".html", newAdress, 'w');

        phantom.exit();
    }
});