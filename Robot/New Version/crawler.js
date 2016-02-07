//-- RECUPERATION DES LIENS PRESENTS SUR LA PAGE --\\

//Importation des modules
//	Pour crawler la page
var crawler = require("js-crawler");
//	Pour executer une ligne de commande depuis notre fichier JS
const exec = require('child_process').exec;
// Pour creer des dossiers sur l'ordinateur
var mkdirp = require('mkdirp');

var tabUrls = [];

//Depth : c'est la profondeur, si elle vaut 1 le robot ne prendra pas compte des liens presents sur la page. Si elle est superieure à 1 alors il y aura un parcours en profondeur.
new crawler().configure({depth: process.argv[2]})
  .crawl(process.argv[3], function onSuccess(page) {
    tabUrls.push(page.url);
  }, null, function onAllFinished(crawledUrls) {
	  //Lorsque tous les URLs ont ete recuperes, on lance le robot scraper sur toutes les liens.
  	var child;
  	var commande;
  	for (var i=0;i<tabUrls.length;i++){
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
