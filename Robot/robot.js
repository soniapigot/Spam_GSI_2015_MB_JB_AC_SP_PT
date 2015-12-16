/**
 * Created by Pierre on 19/10/2015.
 */

// Recupere les mailtos de la page (avec ou sans CSS)
var system = require('system');
var args = system.args;
var page = require('webpage').create();
var fs = require('fs');

//args[1] est le premier argument qu'on passe quand on fait "phantomjs.exe robot.js {arg}". oui c'est pas comme pour
//node et alors ? ;)

//page.open est l'instruction de demarrage de phantomjs, elle nous donne une variable document qui est le DOM de la page
//on peut acceder a ses noeuds et leurs attributs/parents etc
        page.open(args[1], function (status) {
//si tout se passe bien on fait
            if (status !== 'success') {
                console.log("echec");
            } else {
                //on applique la fonction sur la page
                var mailTos = page.evaluate(function () {
                    //on recupere tous les elements de tag a et on les met dans un tableau
                    var a = [].slice.call(document.querySelectorAll("a"));
                    // ce qu'on va retourner
                    var aretourner = [];
                    //on boucle sur a et on recupere tous les attributs href qui sont des mailtos, on fait un substring
                    //pour ne prendre que l'adresse et pas le "mailto:"
                    for (var i = 0; i < a.length; i++) {
                        var href = a[i].getAttribute("href");
                        if (href != undefined && href.search("mailto:") != -1) {
                            aretourner.push(href.substring(7));
                        }
                    }
                    return aretourner;
                });
                var string = "";
                for (var i = 0; i < mailTos.length; i++) {
                    console.log(mailTos[i]);
                    string+=mailTos[i]+",";
                }
                console.log("ici");
                fs.write("C:\\Users\\Pierre\\Desktop\\ProjetOption\\JS\\Robot\\JS\\mailtos"+args[2]+".txt",string,'w');
                console.log("Nombre de mails recoltes " + mailTos.length);
//instruction de fin de phantomjs, important! si on le met pas, ca tourne dans le vide
                phantom.exit();
            }
        });
    //}
    //robot(args[1]);

//}
