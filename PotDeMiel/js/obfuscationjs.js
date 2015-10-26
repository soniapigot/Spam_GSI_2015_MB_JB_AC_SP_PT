$(document).ready(function() {

  var m = "mailto:";
  var u = "dupond";
  var at = "@";
  var d = "mines-nantes";
  var p = ".";
  var fr = "fr";
  var balise1 = document.createElement("a");
  balise1.href = m + u + at + d + p + fr;
  balise1.text = "Email (concat)";
  document.getElementById('ObfuscationJS1').appendChild(balise1);

  function decode(a) {
    return a.replace(/[a-zA-Z]/g, function(c){
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    })
  };
  var balise2 = document.createElement("a");
  balise2.href = decode("znvygb:qhcbaq@zvarf-anagrf.se");
  balise2.text = "Email (ROT13)"
  document.getElementById('ObfuscationJS2').appendChild(balise2);

});
