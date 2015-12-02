/**
 * Created by Pierre on 10/11/2015.
 */

// crée le a.html avec le html de la page (sans exécution du JS et application du CSS
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');

request(process.argv[2], function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var a = $.html();
        console.log(a);
        fs.writeFile("D:\\XAMPP\\htdocs\\projetoption\\a\\a.html",a);

        fs.writeFile("D:\\XAMPP\\htdocs\\projetoption\\b\\b.html",a);
        console.log('done');
        return a;
    }
    else {
        console.log("echec");
    }
});

