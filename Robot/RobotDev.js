/**
 * Created by Pierre on 26/10/2015.
 */
var http = require('http');
var options = {
    host: 'localhost',
    port: 80,
    path: '/potdemiel/PotDeMiel.html',
    method: 'GET'
};
var req = http.request(options, function(res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
        //TODO: data:= end et concatenation des chunks
        var chunkStr = JSON.stringify(chunk);
        //Adresses en mailTo
        var reg = new RegExp('mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}');
        console.log("adresse en mailto");
        var premierMailTo = chunkStr.match(reg);
        var res = [];
        var resteOptimise = "";
        while(premierMailTo != null){
            res.push(premierMailTo[0].substring(7));
            chunkStr = chunkStr.substring(premierMailTo['index']+premierMailTo.length);
            resteOptimise = resteOptimise.concat(chunkStr.substring(0,premierMailTo['index']));
            premierMailTo = chunkStr.match(reg);
        }
        chunkStr = resteOptimise.concat(chunkStr);
//TODO: plusieurs fois la string... corriger ce fuckin probleme
        console.log(res);
        console.log("adresse en texte plein");
        var reg3 = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}','g');
        var res3 = chunkStr.match(reg3);
        console.log(res3);

    });
});


// write data to request body
req.write('data\n');
req.write('data\n');
req.end();
