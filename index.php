<?php
//include("connexion.php")
	include("IdMdp.php");
	try {
		$result='';
		$i = 1;
		foreach($_SERVER as $key => $value){
			$result=$result.$key.' : '.$value.', ';
			$i = $i + 1;
		}
		$bdd = new PDO('mysql:host=cagiva.emn.fr;dbname=miel;charset=utf8', $idBDD, $mdpBDD);
		$bdd->exec('INSERT INTO GENERATION_MAIL (dtDate, strRequete) VALUES(NOW(), \''.$result.'\')');
		$reponseID = $bdd->query('SELECT intID FROM GENERATION_MAIL ORDER BY intID DESC');
		$donneesID = $reponseID->fetch();
		if ($donneesID['intID'] % 1000 == 500) {
			//Changer le titre sur le site
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
    <meta charset = "utf-8"/>
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="stylesheet" href="./css/css.css" />
    <script type="text/javascript" src="./js/jquery-1.11.3.min.js"> </script>
	<?php include("obfuscationjs.php");?>
    <title>Vente Miel</title>
  </head>
  <body>
    <div>
    	<h1>Vente de Miel dans une école de Nantes</h1>
    	<img src="./images/miel1.jpg" alt="miel1" title="miel1">
    </div>
    <div>
      <div>Nous sommes plusieurs élèves des mines de Nantes a vendre du miel pour faire fondre vos papilles.</div>
      <h2>Petite histoire du miel</h2>
        <p align="justify">
        	Le Miel est présent sur la Terre bien avant l'homme car les abeilles qui le fabriquent y sont apparues il y a des dizaines de millions d'années.
        	<br/>
			Apis mellifera signifie « abeille porteuse de miel ». Son nom vient de ce que les hommes crurent d'abord que les abeilles portaient vers la ruche le miel qu'elles trouvaient sur les plantes.
			<br/>
			L’hydromel, boisson fermentée à base d’eau et de miel, est l’une des premières boissons alcoolisées que l’homme ait bu. Les premières traces de production d’hydromel remontent à l’âge de bronze au Danemark !
			<br/>
			Le sucre que nous connaissons aujourd'hui n'est utilisé que depuis quelques siècles seulement : c'est le miel qui était utilisé pour édulcorer les mets, jusqu'à très tard même pour de nombreux paysans modestes.
			<br/>
			Le Mi-Kong, « pain de miel » était un pain de froment au miel, connu dès le Xe siècle en Chine. Les européens d’Occident le découvrent au Moyen Age pendant les croisades auprès des populations arabes. Il n’est autre que notre pain d’épices actuel !
			<br/>
			Le miel a été utilisé pour soigner depuis l’antiquité, embellir la peau et embaumer les morts chez les Egyptiens. Hippocrate disait que l'usage du miel conduisait à la plus extrême vieillesse, et le prescrivait pour combattre la fièvre, les blessures, les ulcères et les plaies purulentes.
			<br/>
			Durant la première et la seconde guerre mondiale, on l'utilisait pour accélérer la cicatrisation des plaies des soldats.
			<br/>
			Aujourd’hui des études sont effectuées pour évaluer les effets thérapeutiques du miel, mais il sera toujours aussi prisé tant qu’il y aura des abeilles !
        </p>
    </div>
    <div>
      <h2>La ruche, un oeuvre d'art</h2>
  		<p align="justify"> Elle étonne encore les mathématiciens. La construction de la ruche commence par le plafond et s'étend vers le bas. C'est un énorme gâteau de cire composé d'alvéoles hexagonales juxtaposées.
						   Les alvéoles ne sont pas placées parfaitement à l'horizontale. Elles font un angle de 7 à 8 degrés vers le haut, pour éviter que le miel s'écoule hors des cellules. La proximité des alvéoles permet un maintient exceptionnel de la température à l'intérieur de la ruche qui est de 33° à 36°. 
						   <br/><br/>
						   Les abeilles produisent leur propre cire. Elles sont suspendues en chaine les unes aux autres pour former un réseau devant "l'immeuble" en construction.
						   Elles sécrètent de petites écailles de cire que d'autres ouvrières détachent et portent à leur bouche avec leurs pattes arrières. Elles incorporent un solvant salivaire à la cire et le tour est joué, la petite boule rejoint la construction de l'alvéole ! 
		</p>
    </div>
    <div>
      <h2>Les produits collectés par les abeilles</h2>
		<p align="justify">
			Pour fabriquer les nombreux produits de la ruche, la récolte des abeilles est diverse et la liste des intrants ramenés à la ruche est large :
			<br/>
				- Du pollen : riche en protéines, il sert de nourriture aux larves. Plus les abeilles auront accès à une gamme de fleurs variée, plus le pollen sera riche et plus la ruche se développera rapidement.
			<br/>- Le nectar de fleurs : il est déposé dans les alvéoles et se transforme ensuite en miel. Le nectar est le don fait par les fleurs aux insectes pollinisateurs afin qu'ils s'intéressent à elles et transportent leur pollen sur d'autres fleurs.
			<br/>- Le miellat : issu des insectes piqueurs de végétaux (pucerons...), le miellat est un liquide sucré qui est stocké dans la ruche comme le nectar et donnera un miel particulier. Certaines années, mais ce n'est pas toujours le cas, les pucerons présents sur les sapins produisent une grande quantité de miellat et permettent la fabrication du miel de sapin.
			<br/>- De l'eau : elle est ramenée à la ruche par les abeilles pour fabriquer le miel et abreuver la colonie
			<br/>- De la propolis : elle est fabriquée par les plantes, c'est une sorte de résine qui se trouve sur les bourgeons. Les abeilles vont la collecter et l'utiliser pour ses vertus antibiotiques.
			<br/><br/>
			Nous travaillons en étroite collaboration avec des apiculteurs de la région nantaise. Si vous souhaitez à tout hasard en savoir plus sur les produits qu'ils fabriquent, vous pouvez les contacter par mail aux adresses suivantes:
			<br/>
			<?php
    		$reponse1 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 1');
    		$donnees1 = $reponse1->fetch();
  			?>
  			<p align="center">
	  			<a href="mailto:<?php echo $donnees1['strNOM'].".".$donnees1['strPRENOM'].$donneesID['intID']; ?>@emn.miel.fr">
	    			<?php echo $donnees1['strNOM'].".".$donnees1['strPRENOM'].$donneesID['intID']; ?>@emn.miel.fr
	  			</a>
  			</p>
  			
			<?php
				$reponse2 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 2');
				$donnees2 = $reponse2->fetch();
			?>
				<p align="center"><?php echo $donnees2['strNOM'].".".$donnees2['strPRENOM'].$donneesID['intID']; ?>@emn.miel.fr</p>
			
			<?php
			$reponse3 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 3');
		    $donnees3 = $reponse3->fetch();
			$adresseASCII = $donnees3['strNOM'].".".$donnees3['strPRENOM'].$donneesID['intID'].'@emn.miel.fr';
			$resultASCII = mb_convert_encoding($adresseASCII,"ASCII","auto");
			$mailASCII = "mailto:";
			$resultmail = mb_convert_encoding($mailASCII,"ASCII","auto");
			?>
			<p align="center">
				<a href="<?php echo $resultmail.$resultASCII;?>">
					<?php echo $resultASCII;?>
				</a>
			</p>
		</p>
    </div>
    <div>
      <h2>Conception du Miel à Nantes</h2>
      	<h3>Le travail des abeilles</h3>
      		<p align="justify">
	      		L’abeille butine le nectar des fleurs pour en utiliser le sucre. Selon la plante, le sucre peut être différent par sa composition en glucose, fructose, disaccharide et saccharose. D’autres éléments du nectar vont donner au miel sa couleur et son goût unique : les vitamines, les pigments, les aromes. 
	      		<br/>
				L’autre source de sucre est le miellat. Le miellat provient des excrétions laissées sur les végétaux par des insectes. Cela peut être par exemple des sucres rejetés par des pucerons ou encore de la sève d’arbre.
				<br/>
				Les abeilles butinent de fleur en fleur en remplissant leurs jabots de substances sucrées. 
				<br/>
				Une fois rentrées à la ruche les butineuses donnent leur récolte à d’autres abeilles en charge d’enrichir le tout en enzymes. Ces enzymes vont changer la composition de la miellée en agissant sur le sucre. Ensuite des ouvrières vont faire sécher ce miel qui contient encore plus de 50% d’eau :
				<br/>
				<br/>- elles régurgitent d’abord plusieurs fois le miel
				<br/>- elles l’étalent en couche avec leur langue
				<br/>- elles entreposent tout cela dans les cellules et laissent murir
				<br/>- les abeilles ventileuses font ensuite rentrer de l’air extérieur
				<br/>- et enfin la colonie fait monter la température à plus de 30°C
				<br/><br/>
				Ce processus va faire réduire jusqu’à 18% la teneur en eau du miel et cela en 4 jours (en moyenne). La cellule une fois pleine de miel, elle est recouverte de cire pour la protéger.
    		</p>
    </div>
    <div>
      <h3>Notre travail</h3>
        <p align="justify">
        	1. La récolte du miel
			La récolte s’opère à la fin de la floraison de la plante qui caractérisera le miel. Dans le cadre d’un miel toutes fleurs, la récolte est réalisée lors des floraisons les plus tardives.
			Les étapes de la récolte :
			enfumage des abeilles pour travailler tranquillement;
			décollage et brossage des cadres;
			transport dans un véhicule étanche jusqu’à la miellerie.
			<br/><br/>
			2. Désoperculer
			Cette étape consiste à enlever la pellicule de cire qui bouche les alvéoles remplies de miel.
			L’opération se réalise avec un couteau à désoperculer en tranchant la couche de cire de bas en haut.
			<br/><br/>
			3. Extraction du miel
			C’est une machine appelée extracteur qui fait jaillir le miel des cadres.
			Il s’agit d’une cuve où l’on dispose sur un bras quelques cadres désoperculés. Ensuite une manivelle fait tourner les cadres et par le biais de la force centrifuge les gouttes de miel sont projetées sur les parois.
			<br/><br/>
			4. Filtrage du miel
			A la sortie de l’extracteur, le miel contient des impuretés.
			C’est une grille à double filtre qui va retirer diverses particules de propolis, de cire, d’opercules, de pattes d’abeilles ou de pollen.
			<br/><br/>
			5. Maturation du miel
			Une fois filtré, le miel doit encore reposer 4 à 5 jours à une température de 20°C minimum pour faire remonter en écume l’ensemble des dernières impuretés. Cette écume est ensuite enlevée avant l’étape suivante.
			<br/><br/>
			6. Conditionnement du miel
			Enfin prêt le miel peut être présenté dans son pot avec une capsule qui assure l’étanchéité et une étiquette avec toutes les mentions légales.
			<br/><br/>
			Nous sommes une équipe de 5 personnes à faire ce travail sur le miel afin de vous concocter de délicieux produits à base de miel. Si vous souhaitez nous joindre, voici nos adresses mails:
			<br/>
			<?php
				$reponse4 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 4');
				$donnees4 = $reponse4->fetch();
			?>
			<p align="center">
				<?php echo $donnees4['strNOM'].".".$donnees4['strPRENOM'].$donneesID['intID']; ?>@emn.<!--potde-->miel.fr
			</p>
       		
			<?php
				$reponse5 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 5');
				$donnees5 = $reponse5->fetch();
			?>
	        <p align="center">
				<?php echo $donnees5['strNOM'].".".$donnees5['strPRENOM'].$donneesID['intID']; ?>@emn.<span class="no_display">potde</span>miel.fr
	        </p>
	        
	        <p align="center">
		        <span class="mirror">
					<?php
						$reponse6 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 6');
						$donnees6 = $reponse6->fetch();
						$adresseMirror = $donnees6['strNOM'].".".$donnees6['strPRENOM'].$donneesID['intID']."@emn.miel.fr";
						$resultMirror = strrev($adresseMirror);
						echo $resultMirror;
					?>
				</span>
	        </p>
	        
	        <p align="center" id="ObfuscationJS1"></p>
	        
	        <p align="center">
				<?php
					$reponse9 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 9');
					$donnees9 = $reponse9->fetch();
					$adresseRot13 = $donnees9['strNOM'].".".$donnees9['strPRENOM'].$donneesID['intID']."@emn.miel.fr";
					$mailrot13 = "mailto:";
					$resultadresserot13 = str_rot13($adresseRot13);
					$resultRot13 = str_rot13($mailrot13.$adresseRot13);
				?>
				<a href="<?php echo $resultRot13;?>" id="ObfuscationJS2">
						<?php echo $resultadresserot13;?>
				</a>
			</p>
        </p>
    </div
    <div>
      <h2>Acheter notre miel</h2>
	      <p align="justify">
			  	Notre miel est vendu 3€ le pot de 250g et 5€ le pot de 500g. Venez en acheter il est génialisimement bon.
				Vous pouvez acheter notre miel en nous contactant au adresse miel suivante:
				<br/><br/>
				<p align="center">
					<?php
						$reponse7 = $bdd->query('SELECT strNOM, strPRENOM FROM METHODE_MAIL WHERE intID = 7');
						$donnees7 = $reponse7->fetch();
						$adresseImage =  $donnees7['strNOM'].".".$donnees7['strPRENOM'].$donneesID['intID']."@emn.miel.fr";
						`./texteffect -t "{$adresseImage}" -e wave-top -d 1 -w 1 -i 45 -f Arial -p 48 -l 1 test.png`;
					?>
				    <img src="test.png" alt="mail" title="mail">
			    </p>
			    <br/><br/>
				Nous vous donnerons rendez-vous au plus vite.
	       </p>
    </div>
  </body>
</html>
