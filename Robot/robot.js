/**
 * Created by Pierre on 19/10/2015.
 */

// Recupere les mailtos de la page (avec ou sans CSS)
var system = require('system');
var args = system.args;
var page = require('webpage').create();
var fs = require('fs');

//function robot() {
//    for (var i=0;i<arguments.length;i++) {
        page.open(args[1], function (status) {

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
    //}
    //robot(args[1]);

//}
