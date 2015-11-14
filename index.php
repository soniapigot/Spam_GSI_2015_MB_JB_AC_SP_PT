<?php
//include("connexion.php")
	try {
		$bdd = new PDO('mysql:host=cagiva.emn.fr;dbname=miel;charset=utf8', 'miel', 'n05ru0lynn1w');
		$bdd->exec('INSERT INTO GENERATION_MAIL (dtDate, strIP) VALUES(NOW(), \''.$_SERVER['REMOTE_ADDR'].'\')');
		$reponseID = $bdd->query('SELECT intID FROM GENERATION_MAIL ORDER BY intID DESC');
		$donneesID = $reponseID->fetch();
		if ($donneesID['intID'] % 1000 == 500) {
			//Envoie d'un mail pour qu'on execute le script pour générer des mails
			//mail("spambot@mines-nantes.fr","[URGENT] générer des comptes mails","ATTENTION, il faut générer de nouveaux comptes utilisateurs au plus vite !")
		}
	}
	catch(Exception $e)
	{
		die('Erreur : '.$e->getMessage());
	}
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset = "utf-8" />
    <link rel="stylesheet" href="./css/style.css" />
    <script type="text/javascript" src="./js/jquery-1.11.3.min.js"> </script>
	<?php include("obfuscationjs.php");?>
    <title>Pot De Miel</title>
  </head>
  <body>
    <div>
      <h1>Projet Spam</h1>
    </div>
    <div>
      <h3>Pratique standard: utilisation du mailto</h3>
        <p align="center">
          <?php
            $reponse1 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 1');
            $donnees1 = $reponse1->fetch();
          ?>
          <a href="mailto:<?php echo $donnees1['strNOM'].".".$donnees1['strPRENOM'].$donneesID['intID']; ?>@emn.miel.fr">
            <?php echo $donnees1['strNOM'].".".$donnees1['strPRENOM'].$donneesID['intID']; ?>@emn.miel.fr
          </a>
        </p>
    </div>
    <div>
      <h3>Adresse en texte plein sans lien</h3>
				<?php
					$reponse2 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 2');
					$donnees2 = $reponse2->fetch();
				?>
      <p align="center"><?php echo $donnees2['strNOM'].".".$donnees2['strPRENOM'].$donneesID['intID']; ?>@emn.miel.fr</p>
    </div>
    <div>
      <h3>Encodage des adresses par des chaînes de caractères</h3>
        <p align="center">
          <a href="mailto:&#100&#117&#112&#111&#110&#100&#064&#109&#105&#110&#101&#115&#045&#110&#097&#110&#116&#101&#115&#046&#102&#114">
            &#100&#117&#112&#111&#110&#100&#064&#109&#105&#110&#101&#115&#045&#110&#097&#110&#116&#101&#115&#046&#102&#114
          </a>
        </p>
    </div>
    <div>
      <h3>Obfuscation via HTML et CSS</h3>
				<?php
					$reponse4 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 4');
					$donnees4 = $reponse4->fetch();
				?>
        <p align="center">
					<p align="center">
						<?php echo $donnees4['strNOM'].".".$donnees4['strPRENOM'].$donneesID['intID']; ?>@emn.<!--potde-->miel.fr
					</p>
        </p>
				<?php
					$reponse5 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 5');
					$donnees5 = $reponse5->fetch();
				?>
        <p align="center">
					<?php echo $donnees5['strNOM'].".".$donnees5['strPRENOM'].$donneesID['intID']; ?>@emn.<span class="no_display">potde</span>miel.fr
        </p>
        <p align="center">
          <span class="mirror">rf.setnan-senim@dnopud</span>
        </p>
    </div>
    <div>
      <h3>L'adresse électronique en tant qu'image</h3>
        <p align="center">
          <img src="./images/mail.jpg" alt="mail" title="mail">
        </p>
    </div
    <div>
      <h3>Génération de l'adresse par JavaScript</h3>
        <p align="center" id="ObfuscationJS1"></p>
        <p align="center" id="ObfuscationJS2"></p>
    </div>
  </body>
</html>
