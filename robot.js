/**
 * Created by Pierre on 19/10/2015.
 */

var page = require('webpage').create();
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.open('http://www.easyvirt.com/nous-contacter/', function(status) {
    if (status !== 'success') {
    } else {
        var mailTos = page.evaluate(function() {
            var a = [].slice.call(document.querySelectorAll("a"));
            var b = [];
            for (var i=0; i < a.length; i++){
                var c = a[i].getAttribute("href");
                if (c!=undefined && c.search("mailto:")!=-1) {
                    b.push(c.substring(7));
                }
            }
            return b;
            });
        for (var i=0; i < mailTos.length; i++) {
            console.log(mailTos[i]);
        }
        console.log(mailTos.length);
    }
    phantom.exit();
});