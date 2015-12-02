/**
 * Created by Pierre on 10/11/2015.
 */
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');

request('https://web.emn.fr/x-info/miel/index.php', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var a = $.html();
        console.log(a);
        fs.writeFile("D:\\XAMPP\\htdocs\\projetoption\\a.html",a);
        fs.writeFile("D:\\XAMPP\\htdocs\\projetoption\\b.html",a);
        console.log('done');
        return a;
    }
    else {
        console.log("echec");
    }
});

