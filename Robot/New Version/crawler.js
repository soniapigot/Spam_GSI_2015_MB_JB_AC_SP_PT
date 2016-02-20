//-- RECUPERATION DES LIENS PRESENTS SUR LA PAGE --\\

//Importation des modules
//	Pour crawler la page
var crawler = require("js-crawler");
//	Pour executer une ligne de commande depuis notre fichier JS
const exec = require('child_process').exec;
// Pour creer des dossiers sur l'ordinateur
var mkdirp = require('mkdirp');
// Pour parser le fichier robots.txt
var robots = require('robots')
  , parser = new robots.RobotsParser();

var tabUrls = [];

var urlBase = process.argv[3];
console.log("urlBase "+urlBase)
var tailleURL = urlBase.length;
var j = 8;
while (j <= tailleURL && urlBase[j] != "/") {
    j++;
}
urlBase = urlBase.substring(0, j+1);
console.log(urlBase);

var disallow = [];
//parser le robots.txt
parser.setUrl(urlBase+'robots.txt', function(parser, success) {
  if(success) {
    console.log("success")
    var users = (parser.parse("").chunks[0]).split("User-Agent");
    console.log("users : " + users);
    //Le fichier robots.txt est splité au niveau des "Disallow: " ce qui créé un tableau split1
    var split1 = (parser.parse("").chunks[0]).split("Disallow: ");
    console.log("split1 "+split1);
    //Le fichier robots.txt est splité au niveau des "Disallow :" ce qui créé un tableau dans le tableau split1
    for (var i = 0;i<split1.length;i++) {
      if (split1[i].includes("Disallow :")) {
        var temp = split1[i].split("Disallow :");
        disallow.push(temp);
      } else {
        disallow.push(split1[i]);
      }
    }
    //Réarrangement du tableau disallow pour ne plus avoir de tableau à l'intérieur mais seulement une liste de string
    for (var i=0;i<disallow.length;i++){
      if(disallow[i].constructor === Array) {
        for(var j=0;j<disallow[i].length;j++){
          disallow.push(disallow[i][j]);
        }
        disallow.splice(i, 1);
      }
      // suppression des strings présentes après le mot clé "Noindex"
      if(disallow[i].includes("Noindex")){
        var index = disallow[i].indexOf("Noindex");
        disallow[i] = disallow[i].substring(0,index);
      }
      // suppression des strings contenant le mot clé "pdf" car ce ne sont pas des URLS
      if(disallow[i].includes("pdf")){
        disallow.splice(i,1);
      }
    }
    // Mise en forme des strings
    disallow[0] = disallow[0].substring(disallow[0].indexOf("User"),disallow[0].length);
    /*for (var i=1;i<disallow.length;i++){
      disallow[i] = disallow[i].substring(0,disallow[i].indexOf("\r"));
    }*/
  }
  console.log("b: "+disallow.length)
});

//Depth : c'est la profondeur, si elle vaut 1 le robot ne prendra pas compte des liens presents sur la page. Si elle est superieure à 1 alors il y aura un parcours en profondeur.
new crawler().configure({depth: process.argv[2]})
  .crawl(process.argv[3], function onSuccess(page) {

  console.log("c")
      tabUrls.push(page.url);
  }, null, function onAllFinished(crawledUrls) {
    //Lorsque tous les URLs ont ete recuperes, on lance le robot scraper sur toutes les liens.
    var child;
    var commande;

    for (var i=0;i<tabUrls.length;i++){
      //Si le User-Agent contient "*" soit tous les robots

      console.log("disallow[0]: "+disallow[0]);
      if (disallow[0].includes("*")){
        var j = 1;
        var trouve = false;
        while(!trouve && j<disallow.length) {
          //Si une url du crawler est disallow alors elle est retirée du tableau dans lequel les url sont crawlées
          if (process.argv[3] + disallow[j] == tabUrls[i]) {
            tabUrls.splice(i,1);
            trouve = true;
          }
          j++;
        }
      }
      console.log(tabUrls[i]);
      if(i==0){
      //Lien de la page
        commande = 'scrapOnePage.bat "' + tabUrls[i] + '" "' + process.argv[4] + '"';
      } else {
      //Lancement du robot sur les liens presents sur la page
        console.log("[crawler.js] Lancement Scraper sur le lien n°"+i);
        commande = 'scrapOnePage.bat "' + tabUrls[i] + '" "' + process.argv[4] + '\\projetoption\\crawl'+ i +'"';
      }
      child = exec(commande);
    }
  });
