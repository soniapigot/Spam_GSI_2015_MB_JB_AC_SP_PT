/**
 * Created by Pierre on 10/11/2015.
 */

// crée le a.html avec le html de la page (sans exécution du JS et application du CSS
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');
var mkdirp = require('mkdirp');
//process.argv[2] est l'argument qu'on passe apres node robotAvecCheerio.js {arg}
request(process.argv[2], function (error, response, html) {
    console.log(process.argv[2]);
    //si tout se passe bien on fait
    if (!error && response.statusCode == 200) {
        //charge le dom dans $
        var $ = cheerio.load(html);
        //Extrait le html
        var a = $.html();
        console.log(a);
        //on ecrit 2 fichiers identiques mais qui vont etre utilises de maniere differentes: a sera sans CSS et JS
        //b sera avec CSS mais sans JS
        mkdirp(process.argv[3]+"\\a", function(err) { 
            // path was created unless there was error
        });
        fs.writeFile(process.argv[3]+"\\a\\a.html",a);
        mkdirp(process.argv[3]+"\\b", function(err) { 
            // path was created unless there was error
        });
        fs.writeFile(process.argv[3]+"\\b\\b.html",a);
        console.log('done');
        return a;
    }
    else {
        //console.log("echec");
    }
});

