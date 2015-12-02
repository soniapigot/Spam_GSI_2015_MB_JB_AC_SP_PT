/**
 * Created by Pierre on 14/11/2015.
 */
// Recupere le CSS
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');

request('https://web.emn.fr/x-info/miel/css/style.css', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var a = $.html();
        fs.writeFile("D:\\XAMPP\\htdocs\\projetoption\\b\\css\\style.css",a);
        console.log('done');

        //return a;
    }
    else {
        console.log("echec");
    }
});

