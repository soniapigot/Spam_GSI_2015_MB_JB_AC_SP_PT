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
            var ret = [];
            [].slice.call(document.querySelectorAll("link")).forEach(function(arg,i){ret.push(arg.getAttribute("href"));});
            //var links = [].slice.call(document.querySelectorAll("link"));
            return ret;
            /*for (var i=0; i < links.length; i++){
                var node = links[i];
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }*/

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

        console.log("links = "+ css[0]);
        console.log("link.length "+css.length);

        for (var i=0; i<css.length;i++){
            var cssi = css[i];
            if (cssi.search(".css")){
                var path = 'adressecss.txt';
                var content = cssi;
                fs.write(path, content, 'w');
            }
        }

        var scripts = page.evaluate(function(){
            var scripts = [].slice.call(document.querySelectorAll("script"));
            for (var i=0; i < scripts.length; i++){
                var node = scripts[i];
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }


            /*page.evaluate(function(){

                [].slice.call(document.querySelectorAll("style")).forEach(function(arg,i){var node = arg[i];
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }});
                [].slice.call(document.querySelectorAll("*")).forEach(function(arg,i){
                    var node = arg[i];
                    if (node.getAttr) {
                        node.parentNode.removeChild(node);
                    }});
                 }

                /!*var a = [].slice.call(document.querySelectorAll("link"));*!/
                var aretourner = [];
                /!* for (var i=0; i < a.length; i++){
                 var src = a[i].getAttribute("href");
                 if (src!=undefined) {
                 aretourner.push(src);
                 }

                 }*!/*/


                return aretourner;
            });



            var a = [].slice.call(document.querySelectorAll("script"));
            var aretourner = [];
            for (var i=0; i < a.length; i++){
                var src = a[i].getAttribute("src");
                if (src!=undefined) {
                    aretourner.push(src);
                }

            }
            return aretourner;
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
    console.log("end1");

    phantom.exit();
    return css;
    console.log("end2");
});
console.log("toto");

