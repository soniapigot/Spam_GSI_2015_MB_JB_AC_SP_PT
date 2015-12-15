/**
 * Created by Pierre on 02/12/2015.
 */
var request = require("request");
var fs = require('fs');
/*
 @args liste d'urls
 @retourne un tableau de taille 3 contenant en indice 0 les adresses non obfusquees, en indice 1 les adresses obfus
 quees avec CSS et en indice 2 les adresses obfusquees avec CSS et/ou JS

 */

function mails() {
    for (var i = 0; i < arguments.length; i++) {

        page.open('http://localhost/projetoption/a.html', function(status) {

            if (status !== 'success') {
            } else {
                var mailTos = page.evaluate(function () {
                    var a = [].slice.call(document.querySelectorAll("a"));
                    var aretourner = [];
                    for (var i = 0; i < a.length; i++) {
                        var href = a[i].getAttribute("href");
                        if (href != undefined && href.search("mailto:") != -1) {
                            aretourner.push(href.substring(7));
                        }
                    }
                    return aretourner;
                });
                for (var i = 0; i < mailTos.length; i++) {
                    console.log(mailTos[i]);
                }
                console.log("Nombre de mails recoltes " + mailTos.length);

                phantom.exit();
            }
        });

    }
}
