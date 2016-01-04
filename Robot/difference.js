/**
 * Created by Pierre on 16/12/2015.
 */

var fs = require('fs');
//on lit le fichier qui contient les adresses des liens vers les mailtos

function liretxt(adresse){

    console.log("liretxt");
    var b = fs.readFileSync(adresse,'utf8');/*,function(err,data){
        if (!err) {
            console.log(data+"ici");

            a = data;
            return "i'm not here";
        } else{console.log("erreur");
            return "i'm here";}
    });*/
    return b;
}

var adresses1 = liretxt(process.argv[2]+"\\Resultats\\mailtos1.txt").split(',');
var adresses2 = liretxt(process.argv[2]+"\\Resultats\\mailtos2.txt").split(',');
var adresses3 = liretxt(process.argv[2]+"\\Resultats\\mailtos3.txt").split(',');

function inter(e1,e2){

    var ret = [];
    for (var i = 0; i<e1.length;i++){
        var e1i = e1[i];
        for (var j = 0; j<e2.length;j++){
            if (e1i == e2[j]){
                ret.push(e1i);
            }
        }
    }
    return ret;
}

function prive(E1,E2){
    var ret = [];
    for (var i = 0; i<E1.length;i++){
        var E1i = E1[i];
        var bool = false;
        var j = 0;
        while (j<E2.length && !bool){
            if (E1i!=E2[i]){
                bool = true;
            }
            j++;
        }
        if (bool){ret.push(E1i);}
    }
    return ret;
}


var E1fin =  inter(adresses1, adresses3);

var E3intE2 = inter(adresses3,adresses2);
console.log(E3intE2);
var E2fin = prive(E3intE2,E1fin);
var E3fin = prive(adresses3,adresses2);

console.log("---------");
console.log("---------");
console.log("---------");
console.log("---------RESULTAT FINAL-----------");
console.log("\nE1 est compose de :"+E1fin.toString());
console.log("\nE2 est compose de :"+E2fin.toString());
console.log("\nE3 est compose de :"+E3fin.toString());




