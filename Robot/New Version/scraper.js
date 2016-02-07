//-- ROBOT SCRAPER --\\

//Importation des modules
//	Pour recuperer les arguments places en ligne de commande
var system = require('system');
var args = system.args;
//	Pour ouvrir et traiter les donnees de la page
var page = require('webpage').create();
//	Pour creer et modifier des fichiers
var fs = require('fs');

page.open(args[1], function (status) {
    if (status !== 'success') {
        console.log("echec");
        phantom.exit();
    } else {
        //Application de la fonction sur la page
        var mailTos = page.evaluate(function () {
            //Recuperation de tous les elements de tag a et sauvegarde dans un tableau
            var a = [].slice.call(document.querySelectorAll("a"));
            var ret = [];
            //Recuperation de tous les attributs href qui sont des mailtos et suppression du mot mailto:
            for (var i = 0; i < a.length; i++) {
                var href = a[i].getAttribute("href");
                if (href != undefined && href.search("mailto:") != -1) {
                    ret.push(href.substring(7));
                }
            }
            return ret;
        });

        var string = "";
        for (var i = 0; i < mailTos.length; i++) {
            string+=mailTos[i]+",";
        }
        console.log("ici");
        if(args[2] != "Tracking") {
            //Ecriture des adresses obfusquees ou non
            fs.write(args[3]+"\\projetoption\\Resultats\\mailtos"+args[2]+".txt",string,'w');
            console.log("Nombre de mails recoltes " + mailTos.length);
        }
        else{
            //Cas du pistage du mailto
            //NON FONCTIONNEL ACTUELLEMENT
         	var strTest = "";
        		var test = page.evaluate(function(){
	                var scripts = [].slice.call(document.querySelectorAll("script"));
	                var ret = [];
	                retS = "";
	                for (var j = 0;j<scripts.length;j++){
	                    ret.push(scripts[j].getAttribute('id'));
	                }
	                for (var o=0;o<ret.length;o++){
	                    retS+=ret[o] + ",";
	                }
	                return retS;
	            });
			fs.write(args[3]+"\\projetoption\\Resultats\\mailtos"+args[2]+".txt",test,'w');
        }
        phantom.exit();
    }
});