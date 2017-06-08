# Gestionnaire de planning hebdomadaire pour organismes de formation

## Installation

### Télécharger nodeJS

https://nodejs.org/en/

### Mettre à jour npm

En ligne de commande

    npm install -g npm

### Mettre à jour ses dépôts npm

    npm update

### Installer les dépendances du projet

Se placer à la racine du projet en ligne de commande puis

    npm install

### Installer la base de données MySQL

Exécuter le script db.sql qui se trouve dans le dossier data

cd data
mysql -u root -p < db.sql

### Inserer ses identifiants MySQL

Ouvrir le fichier app.js à la racine du projet à l'aide de votre de code de votre choix, puis renseigner votre login et mot de passe d'utilisateur mySQL aux lignes 9 et 10

## Utilisation

Démarrer un serveur web de développement à la racine du projet
    node app.js

se rendre à l'adresse suivante :
    http://localhost:8000

## Todo-List

* ajouter la méthode pour supprimer un formateur
* calculer le nombre d'heures hebdomadaires d'un candidat
* mettre à jour les cours du candidat lorsque l'on édite un cours
* ajouter le nom du formateur dans le tooltip des cours des candidats
