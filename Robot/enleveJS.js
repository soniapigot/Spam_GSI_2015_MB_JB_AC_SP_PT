/**
 * Created by Pierre on 16/12/2015.
 */

/**
 * Created by Pierre on 16/12/2015.
 */
var system = require('system');
var args = system.args;
var page = require('webpage').create();
var fs = require('fs');
console.log(args[1]);
page.open(args[1]+args[2]+"/"+args[2]+".html", function(status) {
    if (status != "success") {
        console.log("echec");
    }
    else {
        page.evaluate(function () {
            // on enleve les balises style
            [].slice.call(document.querySelectorAll("script")).forEach(function (arg, i) {
                var node = arg;
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            });
            // on enleve les aatributs style
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