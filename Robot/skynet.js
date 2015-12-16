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
        } else {
            var css = page.evaluate(function () {
                //on recupere tous les attributs href des balises link
                var ret = [];
                [].slice.call(document.querySelectorAll("link")).forEach(function (arg, i) {
                    ret.push(arg.getAttribute("href"));
                });
                //var links = [].slice.call(document.querySelectorAll("link"));
                return ret;
                /*for (var i=0; i < links.length; i++){
                 var node = links[i];
                 if (node.parentNode) {
                 node.parentNode.removeChild(node);
                 }
                 }*/

                /*var a = [].slice.call(document.querySelectorAll("link"));*/

                /* for (var i=0; i < a.length; i++){
                 var src = a[i].getAttribute("href");
                 if (src!=undefined) {
                 aretourner.push(src);
                 }

                 }*/



            });

            console.log("links = " + css[0]);
            console.log("link.length " + css.length);
        //ecriture du fichier facon naive, meilleure version by aurore soon
            for (var i = 0; i < css.length; i++) {
                var cssi = css[i];
                if (cssi.search(".css")) {
                    var path = 'adressecss.txt';
                    var content = cssi;
                    fs.write(path, content, 'w');
                }
            }


            // on ecrase a.html avec la nouvelle page sans css et js
            var js = page.evaluate(function ()   {
                return document;
            });
            var newAdress = js.all[0].outerHTML;
            fs.write("D:\\XAMPP\\htdocs\\projetoption\\a\\a.html", newAdress, 'w');

            phantom.exit();
        }
    }
);
console.log("toto");

