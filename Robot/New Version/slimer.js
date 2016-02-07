//-- TEST PISTAGE DU MAILTO --\\
var slimer = require("slimer");
//	Pour ouvrir et traiter les donnees de la page
var page = require("webpage").create();
var system = require('system');
var args = system.args;
//	Pour creer et modifier des fichiers
var fs = require('fs');

page.open(args[1],function (status) {

    if (status!=200){
        console.log(status);
    }
    var strTest = "";
//do {
    /*var classeTest = document.getElementsByClassName("recuperececi");
     for(var h=0;h<classeTest.length;h++){
     strTest+=classeTest.innerHTML;
     }*/
    var test = page.evaluate(function () {
        var scripts = [].slice.call(document.querySelectorAll("script"));
        var ret = [];
        retS = "";
        for (var j = 0; j < scripts.length; j++) {
            ret.push(scripts[j].getAttribute("id"));
        }
        for (var o = 0; o < ret.length; o++) {
            retS += ret[o] + ",";
        }
        //return retS;
        return ret;
    });
    console.log(test);
//} while (strTest=="");


    fs.write(args[2] + "\\projetoption\\Resultats\\mailtos4.txt", test, 'w');
    page.close();
    phantom.exit();
});