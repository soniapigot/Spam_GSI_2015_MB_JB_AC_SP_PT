var http = require('http');
var options = {
  host: 'localhost',
  port: 80,
  path: '/potdemiel/PotDeMiel.html',
  method: 'GET'
};
var req = http.request(options, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');

    res.on('data', function (chunk) {
    //console.log('BODY: '+chunk);
    var chunkStr = JSON.stringify(chunk);
    var reg = new RegExp('mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}','g');
    console.log("adresse en mailto");
        var listMailTo = chunkStr.match(reg);
        console.log(listMailTo);
        listMailTo.forEach(function(e){
        //    console.log(e.substring(7));
        });

    //page.stringify();
    var reg2 = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}','g');

    });
});


// write data to request body
req.write('data\n');
req.write('data\n');
req.end();
