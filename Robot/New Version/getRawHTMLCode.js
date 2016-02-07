//-- RECUPERATION DU CODE HTML DE LA PAGE SANS LE JS ET LE CSS --\\

//Importation des modules
//	Pour recuperer le DOM de la page sans executer le JS et le CSS
var cheerio = require('cheerio');
//	Pour envoyer une requete
var request = require('request');
//	Pour creer et modifier des fichiers
var fs = require('fs');
//	Pour creer et modifier des dossiers
var mkdirp = require('mkdirp');

//Chemin ou sont sauvegardes tous les resultats
var dir = process.argv[3]+"\\projetoption";

//Dans le cas ou le dossier existe deja, il est supprime
var deleteFolderRecursive = function(path) {
    if(fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

if (fs.existsSync(dir)){
    deleteFolderRecursive(dir);
    console.log("[getRawHTMLCode.js] Dossier supprime.");
}
//Creation du dossier projetoption
mkdirp.sync(process.argv[3]+"\\projetoption", function(err) {
    console.log("[getRawHTMLCode.js] Dossier projetoption cree.");
    if (err) throw err;
});

mkdirp.sync(process.argv[3]+"\\projetoption\\Resultats", function(err) {
    if (err) throw err;
});
//Recuperation du DOM de la page
request(process.argv[2], function (error, response, html) {
    console.log(process.argv[2]);
    if (!error && response.statusCode == 200) {
        //Chargement du DOM dans $
        var $ = cheerio.load(html);
        var domc = $;
        //Extraction du HTML
        var a = $.html();
        //Ecriture des 2 fichiers identiques withoutCSSandJS.html et withoutJS.html
        //  Creation du dossier withoutCSSandJS
        mkdirp.sync(process.argv[3]+"\\projetoption\\withoutCSSandJS", function(err) {
            if (err) throw err;
        });
        // Ecriture du HTML dans le fichier withoutCSSandJS.html
        fs.writeFileSync(process.argv[3]+"\\projetoption\\withoutCSSandJS\\withoutCSSandJS.html",a);

        //  Creation du dossier withoutJS
        mkdirp.sync(process.argv[3]+"\\projetoption\\withoutJS", function(err) {
            if (err) throw err;
        });
        // Ecriture du HTML dans le fichier withoutJS.html
        fs.writeFileSync(process.argv[3]+"\\projetoption\\withoutJS\\withoutJS.html",a);
        mkdirp.sync(process.argv[3]+"\\projetoption\\mailtoTracking", function(err) {
            if (err) throw err;
        });

        //Création des balises pour le pistage du mailto
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
        fs.writeFileSync(process.argv[3]+"\\projetoption\\mailtoTracking\\mailtoTracking.js",chaineCar);

        //Ajout d'une balise script dans le HTML pour le pistage du mailto
        var script = $("<script>");
        script.attr("id", "mailtoTracking");
        script.attr("src", "./mailtoTracking.js");
        script.attr("type", "text/javascript");
        $("head").append(script);
        var contenuC = $.html();

        fs.writeFileSync(process.argv[3]+"\\projetoption\\mailtoTracking\\mailtoTracking.html",contenuC);
        return a;
    }
    else {
        return ;
    }
});