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

    if (status !== 'success') {
        console.log("echec")
    } else {
        var css = page.evaluate(function(){
            [].slice.call(document.querySelectorAll("*")).forEach(function(arg,i){arg.removeAttribute("style");});
            var links = [].slice.call(document.querySelectorAll("style"));
            for (var i=0; i < links.length; i++){
                var node = links[i];
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }

            /*var a = [].slice.call(document.querySelectorAll("link"));*/
            var aretourner = [];
           /* for (var i=0; i < a.length; i++){
                var src = a[i].getAttribute("href");
                if (src!=undefined) {
                    aretourner.push(src);
                }

            }*/


            return aretourner;
        });
        console.log("link.length "+css.length);

        var scripts = page.evaluate(function(){
            var scripts = [].slice.call(document.querySelectorAll("script"));
            for (var i=0; i < scripts.length; i++){
                var node = scripts[i];
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }

            var a = [].slice.call(document.querySelectorAll("script"));
            var aretourner = [];
            for (var i=0; i < a.length; i++){
                var src = a[i].getAttribute("src");
                if (src!=undefined) {
                    aretourner.push(src);
                }

            }
            return aretourner;
        });
        console.log("script.length "+scripts.length);

        var mailTos = page.evaluate(function() {
            var a = [].slice.call(document.querySelectorAll("a"));
            var aretourner = [];
            for (var i=0; i < a.length; i++){
                var href = a[i].getAttribute("href");
                if (href!=undefined && href.search("mailto:")!=-1) {
                    aretourner.push(href.substring(7));
                }
            }
            return aretourner;
        });
        for (var i=0; i < mailTos.length; i++) {
            console.log(mailTos[i]);
        }
        console.log("Nombre de mails recoltes "+mailTos.length);
        var js = page.evaluate(function () {
            return document;
        });
        //console.log(js.all[0].outerHTML);

        //return mailTos;

        var newAdress = js.all[0].outerHTML;
        //var myObject = new ActiveXObject("Scripting.FileSystemObject");
        //var newfile = myObject.createTex("C:\\Users\\Pierre\\Desktop\\ProjetOption\\JS\\Robot\\JS\\newAdress.html", true);
        fs.write("D:\\XAMPP\\htdocs\\projetoption\\newAdress.html",newAdress,'w');
    }

    phantom.exit();
});
