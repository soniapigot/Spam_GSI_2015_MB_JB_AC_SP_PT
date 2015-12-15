/**
 * Created by Pierre on 14/11/2015.
 */
// Recupere le CSS
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');

var adressecss = fs.readFile("C:\\Users\\Pierre\\Desktop\\ProjetOption\\JS\\Robot\\JS\\adressecss.txt"
    ,'utf8',function(err,data){

        console.log(data);
        if (err) throw err;
        var cible = process.argv[2];
        console.log(cible);
        var taille = cible.length;
        var i = 1;
        while(i<=taille && cible[taille-i]!="/"){
            i++;
        }
        cible = cible.substring(0,taille-i+1);
        cible=cible+data;
        console.log(cible);
        request(cible, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var a = $.html();
                fs.writeFile("D:\\XAMPP\\htdocs\\projetoption\\b\\"+data,a);
                console.log('done');

                //return a;
            }
            else {
                console.log("echec");
            }
        });

    });
console.log(adressecss);




