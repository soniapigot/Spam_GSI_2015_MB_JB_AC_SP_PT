var Crawler = require("js-crawler");
const exec = require('child_process').exec;
var mkdirp = require('mkdirp');

var tabUrls = [];

new Crawler().configure({depth: process.argv[2]})
  .crawl(process.argv[3], function onSuccess(page) {
    tabUrls.push(page.url);
  }, null, function onAllFinished(crawledUrls) {
  	const child;
  	var commande;
  	for (var i=0;i<tabUrls.length;i++){
  		if(i==0){
  			commande = 'main.bat "' + tabUrls[i] + '" "' + process.argv[4] + '"';
  		} else {
  			console.log(i);
  			commande = 'main.bat "' + tabUrls[i] + '" "' + process.argv[4] + 'projetoption\\crawl'+ i +'"';
  		}
		child = exec(commande);
  	}
  });
