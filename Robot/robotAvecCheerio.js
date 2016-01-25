/**
 * Created by Pierre on 10/11/2015.
 */

// crée le a.html avec le html de la page (sans exécution du JS et application du CSS
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var dir = process.argv[3]+"\\projetoption";

var deleteFolderRecursive = function(path) {
    if(fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

if (fs.existsSync(dir)){
    deleteFolderRecursive(dir);
    console.log("dossier supprime");
}
//Creation du dossier projetoption
mkdirp.sync(process.argv[3]+"\\projetoption", function(err) {
    // path was created unless there was error
    console.log("projetoption dossier créer");
    if (err) throw err;
});
mkdirp.sync(process.argv[3]+"\\projetoption\\Resultats", function(err) {
    // path was created unless there was error
    if (err) throw err;
});
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
        //on ecrit 2 fichiers identiques mais qui vont etre utilises de maniere differentes: a sera sans CSS et JS
        //b sera avec CSS mais sans JS

        //Creation du dossier a
        mkdirp.sync(process.argv[3]+"\\projetoption\\a", function(err) {
            // path was created unless there was error
            if (err) throw err;
        });
        //On ecrit, dans un fichier a.html qui est dans le dossier a cree precedement, le html de la page traitee
        fs.writeFileSync(process.argv[3]+"\\projetoption\\a\\a.html",a);
        //Creation du dossier b
        mkdirp.sync(process.argv[3]+"\\projetoption\\b", function(err) {
            // path was created unless there was error
            if (err) throw err;
        });
        //On ecrit, dans un fichier b.html qui est dans le dossier b cree precedement, le html de la page traitee
        fs.writeFileSync(process.argv[3]+"\\projetoption\\b\\b.html",a);
        mkdirp.sync(process.argv[3]+"\\projetoption\\c", function(err) {
            // path was created unless there was error
            if (err) throw err;
        });

        //ajout du pistageMailto
        var chaineCar = "var oldSet = Object.getOwnPropertyDescriptor(HTMLAnchorElement.prototype, \"href\").set; "
            +"Object.defineProperty(HTMLAnchorElement.prototype, \"href\", {"
            +"set: function newSet(value) {"
            +"    try {"
            +"      throw new Error();"
            +"    } catch (e) {"
            +"      var p = $(\"<div>\");"
            +"      p.attr(\"class\", \"recuperececi\");"
            +"      p.text(e.stack);"
            +"      $(\"head\").append(p);"
            +"      oldSet.call(this, value);"
            +"  }"
            +"}});";
        fs.writeFileSync(process.argv[3]+"\\projetoption\\c\\pistageMailto.js",chaineCar);

        //On ajoute une balise script dans le html pour le pistage du mailto
        var script = $("<script>");
        script.attr("id", "pistagemailto");
        script.attr("src", "./pistageMailto.js");
        script.attr("type", "text/javascript");
        $("head").append(script);
        var contenuC = $.html();

       
        fs.writeFileSync(process.argv[3]+"\\projetoption\\c\\c.html",contenuC);
        console.log('done');




        return a;
    }
    else {
        console.log("echec");
        return ;
    }
});
