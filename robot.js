/**
 * Created by Pierre on 19/10/2015.
 */

var page = require('webpage').create();
page.open('http://www.easyvirt.com/nous-contacter/', function(status) {
    if (status !== 'success') {
    } else {
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
        console.log(mailTos.length);
    }
    phantom.exit();
});