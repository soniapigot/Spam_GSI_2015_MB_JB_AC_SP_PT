<?php

    include("IdMdp.php");
    $bdd = new PDO('mysql:host=cagiva.emn.fr;dbname=miel;charset=utf8', $idBDD, $mdpBDD);
    $reponseID = $bdd->query('SELECT intID FROM GENERATION_MAIL ORDER BY intID DESC');
	  $donneesID = $reponseID->fetch();
	  $reponse8 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 8');
    $donnees8 = $reponse8->fetch();
?>

 <script language="JavaScript1.2">
    $(document).ready(function() {


      var m = "mailto: ";
      var u = '<?php echo $donnees8['strNOM'].".".$donnees8['strPRENOM'].$donneesID['intID'];?>';
      var at = "@";
      var d = "miel.emn";
      var p = ".";
      var fr = "fr";
      var balise1 = document.createElement("a");
      balise1.href = m + u + at + d + p + fr;
      balise1.text = u + at + d + p + fr;
      document.getElementById('ObfuscationJS1').appendChild(balise1);

      function decode(a) {
        return a.replace(/[a-zA-Z]/g, function(c){
          return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        })
      };
      var mailRot13 = document.getElementById('ObfuscationJS2').getAttribute("href");
      var resultmailRot13 = decode(mailRot13);
      document.getElementById('ObfuscationJS2').setAttribute("href", resultmailRot13);
      var adresseRot13 = document.getElementById('ObfuscationJS2').innerHTML;
      var resultRot13 = decode(adresseRot13);
      document.getElementById('ObfuscationJS2').innerHTML = resultRot13;



    });
</script>
