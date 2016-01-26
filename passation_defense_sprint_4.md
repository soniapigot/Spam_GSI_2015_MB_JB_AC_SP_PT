###Etape 1 : récupérer les mails avec cygwin qui sont dans var 

En ligne de commande : 
se placer dans le dossier où l'on veut copier les fichiers avec cd
taper : scp -r admin@miel.emn.fr:../../var/mail .
Rentrer le mdp : admingsi
--> le fichier est copié ! 

###Etape 2 : parser le mail pour avoir le numero de l'adresse mail

Projet Java mailParsing
download le jar javax.mail.jar :  https://java.net/projects/javamail/pages/Home
clic droit sur le projet et ajouter ce jar (add external jars)

### Etape 3 : retrouver la requête correspondante dans la BDD
on extrait la BDD en xml !
- http://cynober.developpez.com/tutoriel/java/xml/jdom/
il faut ajouter le jar JDOM dans le build path après l'avoir téléchargé ici (et dézippé) : http://www.jdom.org/downloads/

 
avec quoi ? 
- visual basic : https://msdn.microsoft.com/fr-fr/library/cakac7e6.aspx




Gestion de projet 04/01/2016 :

prio 1 : regarder les strategies des robots connus : ex : robot crawler/scraper
client pop interfaçable

