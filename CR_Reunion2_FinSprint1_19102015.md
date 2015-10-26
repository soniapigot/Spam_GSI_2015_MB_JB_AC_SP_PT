#Compte rendu de la réunion du 19.10.2015 : 

*Personnes présentes : Hervé Grall, Florent Marchand de Kerchove, Sonia Pigot, Pierre Teilhard, Aurore Claude & Mélyna Boniface*

#**PLANNING :**

La répartition des sprints est validée.

#**CAHIER DES CHARGES :**

Autres idées pour les méthodes d’obfuscation: “*combien font 1+3 ?*”, “*sélectionnez toutes les tartes*” et "*cocher ‘je ne suis pas un robot*’”.

**ETAT DE L’ART:**

Prendre des screenshots de méthodes d’obfuscation et insérer les liens où l’on trouve ces méthodes dans un document.

**POT DE MIEL :**

- Analyser le comportement des pots de miel (durée au bout de laquelle on reçoit des robots)
- Faire une méthode dans le pot de miel où le calcul de l’adresse mail (en javascript ou du code ascii) est déclenché seulement quand l’utilisateur passe la souris ou clique sur l’adresse.

**ROBOT SKYNET :**

Pour l’instant le JavaScript est automatiquement exécuté à l’ouverture de la page (page.open), ce qui n’est pas fait par la majorité des robots.
 
Le but de Skynet est de récolter les adresses mais aussi d’obtenir le code source des adresses pour voir quelles sont les méthodes d’obfuscation utilisée soit on trouve automatiquement, soit il faut une intervention humaine). Il faut donc faire une méthode qui permet de savoir quelles fonctions ont caché l’adresse mail. Pour avoir le code html on peut récupérer le code envoyer par le serveur puis les parser, ce qui est probablement plus rapide que de lancer PhantomJS.

Il faudrait tester le temps d’exécution de PhantomJS.

**SERVEUR, MAIL, BESOIN MATERIEL :**
 
#####2 Serveurs :

**Partie mail :** du SPAM va être reçu sur les adresses fictives. Dès que du SPAM est envoyé sur ces adresses, les informations seront transférées sur un autre serveur : nous devrons alors trouver d’où le SPAM provient. 

Florent propose une machine dédiée de type Rasberry (~30 €) qu’il pourrait nous prêter. Ensuite, les données seraient transférées sur un disque dur, ainsi nous pourrions les analyser (enregistrer les *dates* où elles ont été envoyées et aussi le *lieu* (côté serveur web)).

Il est nécessaire de changer les adresses mails sur le pot de miel à chaque visiteur afin de pouvoir savoir à quel moment elle a été récoltée. 

Pour avoir un grand nombre d’adresse mail, le nom de l’utilisateur pourrait être le même suivis d’un année (nombre à 4 chiffres). Ceci permettrait de générer beaucoup de combinaisons différentes d’adresses mail. Le nombre d’adresse mail nécessaire pour la page du pot de miel devrait être de: méthodes différentes*nombre de visiteurs.

**Pour le pot de miel :** cf. réunions avec les personnes du SIC

######**DONNEES A RECOLTER :** 
Les adresses utilisées (liée à la technique utilisée et à une date de création donnée), quel robot a récupéré l’adresse (regarder sur le serveur http, ainsi on a accès à l’adresse IP qui a demandé de charger la page et on peut récupérer différentes données  telles que user_agent, date, lieu).

**Attention à ne pas créer de faille :** lire les données à la main (si trop longtemps pour fermer on utilise time_out) => il faut créer un serveur à la main

#SPRINT 2 : 

#####DEFENSE :

**Traitement pot de miel :** générer des adresses emails unique / méthode / requête ou visiteur de la page.

<font color="red"> 
**Priorité 1 :** 
</font>
avoir un serveur mail fonctionnel (créer les comptes UNIX à l’avance et script pour changer les emails sur la page)

<font color="orange"> 
**Priorité 2 :** 
</font>
coder nos idées en matière de méthodes d’obfuscation

<font color="green"> 
**Priorité 3 :** 
</font>
approfondir l’état de l’ART (recenser les méthodes, les classer), trouver de nouvelles méthodes d’obfuscation basé sur l’interaction avec l’utilisateur

#####ATTAQUE : 

<font color="red"> 
**Priorité 1 :** 
</font>
stratégie 0 - créer un robot simple capable de récupérer des adresses email et de spécifier la méthode d’obfuscation utilisée, en comparant avec les adresses mail récupérées par notre robot témoin implémenté avec PhantomJS. On ne s'intéresse ici qu'aux méthodes d'obfuscation contournées par le robot témoin, et quand le robot stratégie 0 arrive à déceller toutes les adresses que le robot témoin reconnaît, on améliorera ce dernier (sprints futurs).

<font color="orange"> 
**Priorité 2 :** 
</font>
améliorer le robot déjà implementé sous PhantomJS de façon à récupérer toutes les adresses mail obfusquées dans notre pot de miel.

<font color="green"> 
**Priorité 3 :** 
</font> 
décomposer les différentes étapes de calcul réalisées par PhantomJS lors de l’extraction d’adresses obfusquées.

**Remarque :** possibilité de mettre des ‘issues’ sous GitHub