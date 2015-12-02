/**
 * Created by Pierre on 19/10/2015.
 */

var page = require('webpage').create();
var fs = require('fs');
page.open('http://localhost/projetoption/a.html', function(status) {

    if (status !== 'success') {
    } else {
        /*var css = page.evaluate(function () {
            var scripts = [].slice.call(document.querySelectorAll("link"));
            for (var i = 0; i < scripts.length; i++) {
                var node = scripts[i];
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }

            var a = [].slice.call(document.querySelectorAll("link"));
            var aretourner = [];
            for (var i = 0; i < a.length; i++) {
                var src = a[i].getAttribute("href");
                if (src != undefined) {
                    aretourner.push(src);
                }

            }
            return aretourner;
        });
        console.log("link.length " + css.length);

        var scripts = page.evaluate(function () {
            var scripts = [].slice.call(document.querySelectorAll("script"));
            for (var i = 0; i < scripts.length; i++) {
                var node = scripts[i];
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }

            var a = [].slice.call(document.querySelectorAll("script"));
            var aretourner = [];
            for (var i = 0; i < a.length; i++) {
                var src = a[i].getAttribute("src");
                if (src != undefined) {
                    aretourner.push(src);
                }

            }
            return aretourner;
        });
        console.log("script.length " + scripts.length);
        */
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
