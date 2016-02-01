/**
 * Created by Pierre on 19/10/2015.
 */
// pas obfusquées + CSS + JS

var system = require('system');
var args = system.args;
var page = require('webpage').create();
var fs = require('fs');

console.log(args[1]);
page.open(args[1], function(status) {
//si tout se passe bien on fait
        if (status !== 'success') {
            console.log("echec")
            phantom.exit();
        } else {
            var css = page.evaluate(function () {
                //on recupere tous les attributs href des balises link
                var ret = [];
                [].slice.call(document.querySelectorAll("link")).forEach(function (arg, i) {
                    ret.push(arg.getAttribute("href"));
                });
                return ret;
            });

            console.log("links = " + css[0]);
            console.log("link.length " + css.length);
            var contentFin = "";
            //ecriture du fichier
            for (var i = 0; i < css.length; i++) {
                var cssi = css[i];
                if (cssi.search(".css")>=0) {
                    var path = '\\projetoption\\adressecss.txt';
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


            // on ecrase a.html avec la nouvelle page sans css et js
            var js = page.evaluate(function ()   {
                return document;
            });
            var newAdress = js.all[0].outerHTML;
            fs.write(args[2]+"\\projetoption\\a\\a.html", newAdress, 'w');

            phantom.exit();
        }
    }
);
console.log("toto");

