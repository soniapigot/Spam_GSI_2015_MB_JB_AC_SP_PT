#Projet JSPAM 

##Introduction

*Ce projet porte sur l'étude de l'obfuscation des adresses mail dans les pages web. Cette partie du projet se concentre plus particulièrement sur la partie **Attaque**, c'est-à-dire sur la création d'un robot capable les adresses mail présentes sur les pages qu'elles soient obfusquées ou non.*

*Le code est totalement* **OpenSource***, le langage utilisé pour implémenter ce robot est le* **JavaScript**.

Auteurs : **J**oël Bouhier, **S**onia Pigot, **P**ierre Teilhard, **A**urore Claude, **M**élyna Boniface. Nous sommes cinq étudiants en option *Génie des Systèmes Informatiques* à l'Ecole Mines Nantes.

##Sommaire

###[I. Adresses récoltables](#1)

###[II. Focus sur le code](#2)

####[1) Configuration préalable](#21)

####[2) Librairies utilisées](#22)

####[3) Utilisation du robot](#23)

###[III. Annexes](#3)

##Marche à suivre

<a name="1"></a>

###I. Adresses récoltables

Le nombre de méthodes d'obfuscation des adresses mail est en constante évolution. A mesure que des robots pirates parviennent à craquer les adresses protégées, de nouvelles méthodes sont mises en place.

Notre robot reste assez rudimentaire, certaines méthodes d'obfuscation n'ont pas pu être détournées. 
La première contrainte porte sur la localisation de l'adresse mail dans le code *HTML*. En effet, le robot peut seulement récupérer les adresses mail qui se trouvent dans une **balise mailto**.

Il est ainsi possible de récupérer des adresses email obfusquées de façon simple :

- avec du *CSS*,
- avec du *JavaScript*,
- et en mélangeant les deux.

Il n'est pas exemple pas possible de récupérer des adresses mail obfusquées par un *Captcha*.

En outre, notre robot tient compte du document *Robot.txt* de chaque page web qu'il visite. Il n'est donc pas possible de récupérer des adresses mail là où l'accès lui est refusé.

<a name="2"></a>

###II. Focus sur le code

<a name="21"></a>

####1) Configuration préalable

Pour faire tourner le robot, vous devez dans un premier temps faire l'aquisition de certains logiciels.

#####Installation de NodeJS

La première étape consiste à installer **NodeJS**, celui-ci permet l'utilisation du JavaScript en *server-side* ([lien de téléchargement ici !](!https://nodejs.org/en/download/)).

#####Installation de PhantomJS

Ensuite, il est nécessaire d'installer **PhantomJS**. Il sert à automatiser interactions avec les pages web. Il est à noter que l'ensemble des documents présents dans le robot doivent être **placés au même endroit que l'exécutable de *PhantomJS*** pour que le robot fonctionne correctement  ([lien de téléchargement ici !](!http://phantomjs.org/download.html)).

#####Installation d'un environnement de développement JavaScript

Dans le cas où vous compteriez modifier le code, il vaut faut installer un environnement de développement adéquat. Vous pouvez notamment utiliser **WebStorm** ([lien téléchargement ici !](!https://www.jetbrains.com/webstorm/download/#section=windows-version)).

#####Installation d'un serveur local

Si vous n'en avez pas de déjà installé sur votre PC, nous vous suggérons d'utiliser **Wamp Server** ([lien téléchargement ici !](!http://www.wampserver.com/#download-wrapper)) ou **Xampp** ([lien téléchargement ici !](!https://www.apachefriends.org/fr/download.html)).

<a name="22"></a>

####2) Librairies utilisées

Une fois l'étape précédente fonctionnelle, vous devez télécharger des librairies nécessaire au bon fonctionnement du robot. Voici les différentes librairies dont nous avons eues besoin :

###### Cheerio

Cette librairie permet de récupérer le code HTML de la page avant qu'elle soit interpréter. Le JavaScript et le CSS ne sont absolument pas pris en compte.

###### Request

Cette librairie sert à envoyer des requêtes HTTP à une page cible.

###### Fs

Cette librairie permet notamment l'écriture et la lecture d'un fichier texte.

###### Webpage

Cette librairie sert à parcourir une page web et à effectuer des traitements sur celle-ci.

###### System

Cette librairie permet, entre autre, la récupération d'argument donné par l'utilisateur en ligne de commande.

###### Mkdirp

Cette dernière librairie sert en particulier à créer des dossiers.

Pour installer librairies, ouvrez une invite de commande et tapez la ligne suivante : 
![Installation Librairie](installationLibrairie.png)

, où nomLibrairie est le nom de la librairie tout en minuscule. Puis cliquez sur entrée.

<a name="23"></a>

####3) Utilisation du robot

1. Avant de lancer le robot, il faut lancer votre **serveur local**.
2. Déplacer tous les fichiers du robot dans **le dossier de phantom.exe**, pour que les fichiers qui nécessitent phantomJS pour être exécutés, soient lancés correctement.
3. La dernière étape consiste à lancer le fichier main.bat. Pour ce faire, il suffit d'ouvrir un **invite de commande** et de se déplacer dans le dossier où tous les fichiers du robot et phantom.exe sont présents. Enfin, entrez la ligne de commande suivante :

![Lancement Main](lancementMain.png)

Pour l'**emplacement du dossier dans le serveur local**, il vous faut indiquer la racine de vos projets. Le chemin ne doit pas se terminer par un /.

<a name="3"></a>

###III. Annexes

Nous détaillons ici l'utilité de chaque partie du code.

####<font color="black">Code couleur</font>

- <font color="green">**Green**</font> : le fichier se lance avec en **ligne de commande**. Il y a deux possibilités pour l'ouvrir, soit en utilisant un **shell** : se placer dans le dossier du fichier puis tapper le *nom complet* de ce dernier pour le lancer. Soit en **double-cliquant** dessus depuis le navigateur de dossier s'il n'y a pas d'argument à utiliser.
- <font color="purple">**Purple**</font> : le fichier se lance avec **NodeJS**. Il suffit alors d'ouvrir un *shell* et d'écrire la ligne "*node nomDuFichierComplet Arguments"*.
- <font color="grey">**Grey**</font> : le fichier se lance avec **PhantomJS**. Il suffit alors d'ouvrir un *shell* et d'écrire la ligne "*phantomjs nomDuFichierComplet Arguments*.

####<font color="green">main.bat</font>

Ce script est celui qui permet de lancer l'e#nsemble des différents programmes implementés jusqu'ici. Il est à noter que certains des arguments y sont mentionnés. Avant tout, il est nécessaire de lire attentivement ce script pour comprendre quels sont les arguments nécessaires au bon fonctionnement du robot et avec quel logiciel est lancé chaque partie du programme.

En ce qui concerne les arguments, pour **NodeJS** : *node args[1] args[2]*, alors que pour **PhantomJS** : *phantom args[0] args[1]*.

####<font color="purple">robotAvecCheerio.js</font>

##### But

L'utilité de ce morceau de programme est la suivante : il récupère le code HTML d'une page donnée en argument avant l'interprétation du JavaScript et du CSS.

Deux documents sont créés en local sous le nom de '*a.html*' et '*b.html*'.

##### Fonctionnement

Les différents arguments utilisés sont les suivants :

- l'**URL** de la page web où sont contenues les adresses email à récupérer. Il est nécessaire de mentionner cet argument dans le *main.bat*.
- la **localisation** des deux fichiers sortie qui est mentionnée en premier argument lors du lancement de *main.bat*.

Le but est double :

- par la suite, le document '*a.html*' sera utiliser pour récupérer les **adresses email non obfusquées**,
- le document '*b.html*' sera, quant à lui, utilisé pour récupérer **les adresses email non obfusquées et celle obfusquées avec du CSS**.

####<font color="grey">enleveJS.js & enleveCSS.js</font>

##### But

Comme son nom laisse à penser, le but de ce fragment de code est d'enlever les **balises** **JavaScript** et / ou **CSS**.

##### Fonctionnement

Nous allons dans un premier temps enlever les balises *style* de **a.html** -donc le **CSS**- à l'aide de *enleveCSS.js* et les balises *scripts* -donc le **JavaScript**- par l'intermédiaire de *enleveJS.js*. Tandis que pour le document HTML **b.html**, nous allons simplement utiliser *enleveJS.js* pour ainsi supprimer le **JavaScript** tout en conservant les balises **CSS**.

Le but de cette manipulation est de pouvoir glâner des adresses email propres ou non sur **a.html** et sur **b.html**. Avec les groupements d'adresses récoltés, nous pourrons déterminer par un programme, quelle a été la méthode d'obfuscation employée !

####<font color="grey">skynet.js</font>

##### But

Cette partie ne concerne que le document **b.html**, le but étant à terme de récupérer le **CSS** dans les adresses indiquées par les balises *script* contenues dans le fichier.

Ici, le programme récupère le fragment des **chemins des fichiers CSS** utilisés sur la page web et les écrit dans un **fichier texte** sauvegardé sur l'ordinateur en local -par exemple : *"/CSS/style.css*"-.

Remarque : le fait que nous ne récupérons jamais le **JavaScript** et pas non plus le **CSS** dans le dossier de **a.html**, permet qu'ils ne soient pas interprétés. En effet, les balises contenant les chemins d'accès au **JavaScript** et au **CSS** ne sont pas vidées de leur contenu, seulement le chemin qu'elles indiquent ne pointe pas en local vers des sous-dossiers / fichiers existants. Cela n'induit cependant **aucune erreur d'exécution**.

##### Fonctionnement

Le seul argument utilisé est l'adresse en locale de la page web à décortiquer.

####<font color="purple">scripts.js</font>

##### But

L'objectif est de lire les fragments de chemin indiqués dans le fichier texte généré par *skynet.js* et de créer aux emplacements indiqués les fichiers **CSS**. A noter qu'ici, on utilise **NodeJS** contrairement à *skynet.js*. C'est pourquoi, le traitement complet ne peut être effectué par un seul et même fichier.

##### Fonctionnement

Comme expliqué ci-dessus, le seul fichier utilisé est le **fichier texte** généré par *skynet.js* et sauvegardé en local sur l'ordinateur, qui contient l'ensemble des chemins où sont stockés les fichiers **CSS** utilisés sur la page web.

####<font color="grey">robot.js</font>

##### But

Le but est simple : en entrée un fichier **HTML** où le **CSS** et/ou le **JavaScript** y a/ont été interprété(s), en sortie la liste de toutes les adresses email contenues dans les balises *mailto*. 

Remarque : dans le cas où le **CSS** n'a pas été interprété, les adresses obfusquées sont sauvegardées telles quelles -par exemple : "*rf.nme.leim@tnopud.samoht*" au lieu de "*thomas.dupont@miel.emn.fr*"-. Un autre type de problème se pose avec la non-interprétation du **JavaScript**, généralement l'adresse email n'est tout simplement pas accessible.

##### Fonctionnement

######Lancement de *robot.js* sur

**...a.html** (CSS et JS non appliqués)

Nous permet de récupérer les adresses email non obfusquées. Elles sont écrites dans un **fichier texte**.

Remarque : des adresses parasites se glissent dans le fichier de sortie. Ceux sont celles obfusquées avec du **CSS**. Ici, nous récupérons le résultat de l'obfuscation qui n'est donc pas exploitable.

**...b.html** (JS non appliqué)

Nous permet de récupérer les adresses email non obfusquées et celle obfusquée avec du **CSS**. Elles sont écrites dans un **fichier texte**.

Remarque : dans le fichier de sortie, il n'y a théoriquement aucune adresse email parasite.

**...la page web**

Nous permet de récupérer toutes les adresses email de la page (elles doivent cependant être contenues dans une balise **mailto**). Elles sont écrites dans un **fichier texte**.

###### Séparation en sous-ensemble des adresses email glânées

Une ultime étape consiste alors à repartir les adresses email récoltées dans **trois sous-ensembles** qui sont les suivants :

- adresses email non obfusquées,
- adresses email obfusquées avec du **CSS**,
- adresses email obfusquées de façon sophistiquées.

En effet, nous n'écartonss pas la possibilité que des adresses email ait pu être obfusquée de façon plus ingénieuse qu'en ayant recours soit au **CSS** seul, soit au **JavaScript** seul.

Pour finir, le découpage en sous-ensemble s'opère grossièrement de la façon suivante : nous comparons les différents paquets d'adresses obtenus lors des **trois** passages de *robot.js* sur **a.html**, **b.html** et **la page web**, en sachant que celui qui contient le moins d'adresses parasites est le dernier.

Pour plus de détail sur la façon dont cette distribution est opérée, se référer aux slides n°3 et 4 du powerpoint utilisé lors de la réunion du 16 décembre 2015, enregistré sur le drive sous le nom de "*Attaque 16 12 2015.pptx*".