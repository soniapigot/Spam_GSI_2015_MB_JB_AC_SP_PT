var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');

var adressecss = fs.readFile("C:/Users/auror_000/Documents/Ecole/A3/Projet Option - SPAM/GitHub/Spam_GSI_2015_MB_JB_AC_SP_PT/Robot/test.txt"
    ,'utf8',function(err,data){

        console.log("Dans le document : "+data);
        if (err) throw err;
        var cible = process.argv[2];
        console.log("En argument : "+cible);
        var taille = cible.length;
        var i = 1;
        while(i<=taille && cible[taille-i]!="/"){
            i++;
        }
        cible = cible.substring(0,taille-i+1);
        console.log("En argument tronqué : "+cible);
        var lines = data.split('\n');
        console.log("Taille du tableau : "+lines.length);
        var texte = "";
        for(var i=0; i<lines.length; i++) {
          texte = texte+cible+lines[i]+"\n";
        }
        // cible=cible+data;
        // request(cible, function (error, response, html) {
        //   //200 : requête correcte
        //     if (!error && response.statusCode == 200) {
        //         var $ = cheerio.load(html);
        //         var a = $.html();
        //         fs.writeFile("D:\\XAMPP\\htdocs\\projetoption\\b\\"+data,a);
        //         console.log('done');
        //
        //         //return a;
        //     }
        //     else {
        //         console.log("echec");
        //     }
        console.log("A mettre dans le document : "+texte);
        fs.writeFile("C:/Users/auror_000/Documents/Ecole/A3/Projet Option - SPAM/GitHub/Spam_GSI_2015_MB_JB_AC_SP_PT/Robot/return.txt",texte);
        var f = new Folder('myfolder');
        if (!f.exists) f.create();
        // });

    });
