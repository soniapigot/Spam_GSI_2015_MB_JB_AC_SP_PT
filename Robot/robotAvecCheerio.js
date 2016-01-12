/**
 * Created by Pierre on 10/11/2015.
 */

// crée le a.html avec le html de la page (sans exécution du JS et application du CSS
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');
var mkdirp = require('mkdirp');
console.log("entre");
mkdirp(process.argv[3]+"\\projetoption", function(err) { 
    // path was created unless there was error
    console.log("projetoption dossier créer");
    if (err) throw err;
});
mkdirp(process.argv[3]+"\\projetoption\\Resultats", function(err) { 
    // path was created unless there was error
    if (err) throw err;
});
console.log("sortie");
//process.argv[2] est l'argument qu'on passe apres node robotAvecCheerio.js {arg}
request(process.argv[2], function (error, response, html) {
    console.log(process.argv[2]);
    //si tout se passe bien on fait
    if (!error && response.statusCode == 200) {
        //charge le dom dans $
        var $ = cheerio.load(html);
        var domc = $;
        //Extrait le html
        var a = $.html();
        //console.log(a);
        //on ecrit 2 fichiers identiques mais qui vont etre utilises de maniere differentes: a sera sans CSS et JS
        //b sera avec CSS mais sans JS
        mkdirp(process.argv[3]+"\\projetoption\\a", function(err) { 
            // path was created unless there was error
            if (err) throw err;
        });
        fs.writeFile(process.argv[3]+"\\projetoption\\a\\a.html",a);
        mkdirp(process.argv[3]+"\\projetoption\\b", function(err) { 
            // path was created unless there was error
            if (err) throw err;
        });
        fs.writeFile(process.argv[3]+"\\projetoption\\b\\b.html",a);


        [].slice.call(html.getElementsByTagName("head")).forEach(function (arg, i) {
            var node = arg;
            node.appendChild(html.createElement("script"));
            node.setAttribute("src", "./pistageMailto.js");
            node.setAttribute("type", "text/javascript");

        });

        mkdirp(process.argv[3]+"\\projetoption\\c", function(err) {
            // path was created unless there was error
            if (err) throw err;
        });
        fs.writeFile(process.argv[3]+"\\projetoption\\c\\c.html",a);
        console.log('done');

        //ajout du pistageMailto
        var b = fs.writeFile(process.argv[3]+"\\projetoption\\c\\pistageMailto.js",fs.readFile("./pistageMailto.js","utf8",function(err,data){
            if (err) throw err;
            return data;
        }));

        return a;

    }
    else {
        console.log("echec");
        return ;
    }
});

