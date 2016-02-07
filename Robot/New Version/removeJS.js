//-- SUPPRESSION BALISES RELATIVES AU JS --\\

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
    console.log("[removeJS.js] Fichier cible : "+target);
    if (status != "success") {
        console.log("[removeJS.js] Ouverture fichier echec.");
        phantom.exit();
    }
    else {
        page.evaluate(function () {
            //Suppression des balises script
            [].slice.call(document.querySelectorAll("script")).forEach(function (arg, i) {
                var node = arg;
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            });
            //Suppression des attributs script
            [].slice.call(document.querySelectorAll("*")).forEach(function (arg, i) {
                if (arg.getAttribute("script")) {
                    arg.removeAttribute("script");
                }
            });
        });

        var js = page.evaluate(function () {
            return document;
        });
        var newAdress = js.all[0].outerHTML;
        fs.write(args[3]+ "\\projetoption\\" + args[2] + "\\" + args[2] + ".html", newAdress, 'w');

        phantom.exit();
    }
});