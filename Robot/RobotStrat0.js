var http = require('http');
var options = {
  host: 'web.emn.fr',
  port: 80,
  path: '/x-info/miel/PotDeMiel.php',
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
        var exec = require('child_process').exec,
            child;

        child = exec('C:\\Users\\Pierre\\Desktop\\ProjetOption\\JS\\Robot\\JS\\phantomjs.exe C:\\Users\\Pierre\\Desktop\\ProjetOption\\JS\\Robot\\JS\\robot.js',
            function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
                else {
                    console.log(stdout);
                    return stdout;
                }
            });


    //page.stringify();
    var reg2 = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}','g');

    });
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();