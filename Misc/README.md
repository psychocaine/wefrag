# Évaluation technique

## Introduction

Afin de jauger tes qualités techniques, nous te proposons un petit test :
Tu vas avoir **5 jours** (jusqu'à vendredi) pour coder une API basique en Node.js.

Ce test sera pour nous l'occasion de voir tes méthodes de travail et de développement et de juger de tes qualités techniques.

Afin que ce test soit représentatif, pour toi comme pour nous, de ce qui nous attend dans les prochains mois, nous avons choisi de te faire travailler sur une stack technique proche de la notre.

## Consigne

Tu vas devoir créer, dans ce test, une API qui permettra à notre back-end d'envoyer des notifications à nos utilisateurs en fonction de leur grade.
Pour cela, tu devras créer une API GraphQL, en node.js, avec une base de données MySQL.

L'API devra permettre de récupérer les informations d'un utilisateur :

- son identifiant
- son email
- son grade

Elle devra aussi permettre d'enregistrer un nouvel utilisateur (ou d'en modifier un existant), avec toutes les informations nécessaires.

Enfin, elle devra posséder une mutation qui répondra aux règles suivantes :

- Elle devra notifier tous les utilisateurs, selon un ordre précis
- Chaque notification est symbolisé par une ligne dans la console
- Au moment de l'appel de la mutation, seuls les grades **OR** doivent recevoir une notification
- 30 secondes plus tard, les grades **Argent** doivent recevoir une notification
- Une minute après l'appel de la mutation, les grades **Bronze** et non définis la reçoivent

Une sortie possible pourrait être celle-ci :

```
-- GRADE OR --
[16-01-20 19:20:02] Notification envoyée à XX0
[16-01-20 19:20:02] Notification envoyée à XX1
[16-01-20 19:20:03] Notification envoyée à XX2

-- GRADE ARGENT --
[16-01-20 19:20:33] Notification envoyée à XX3
[16-01-20 19:20:33] Notification envoyée à XX4
[16-01-20 19:20:33] Notification envoyée à XX5

-- AUTRES GRADES --
[16-01-20 19:21:03] Notification envoyée à XX6
[16-01-20 19:21:03] Notification envoyée à XX7
```

Toute fonctionnalité supplémentaire sera évidemment appréciée.

Pour pouvoir être testée, ton application devra pouvoir être lancée sur un système Ubuntu, depuis la console, en suivant la procédure que tu indiqueras plus bas dans ce document. L'API sera interrogée via un client comme Postman ou Insomnnia.

## Méthode de rendu

Le rendu se fera, au fur et à mesure de l'avancement du projet, sur ce repo Git.
Tu es libre de t'organiser comme tu le souhaites, de créer des branches, des MR ou bien de travailler sur Master.
Tu devras documenter ton application en complétant ce fichier (dans la section **Documentation**). À minima, explique nous quelle est la procédure pour lancer l'application.

Tu fourniras aussi, sur ce repo, un dump de base de données minimal.

## Méthode d'évaluation

Dans un premier temps, nous évaluerons le bon fonctionnement de l'application et la bonne gestion des retours d'erreurs simples (nous ne sommes pas des barbares, ne fait ques les cas les plus basiques).

Une fois ces premières impressions recueillies, nous plongerons dans le code, afin d'en tester la lisibilité et la qualité. Si nous n'attendons pas un code _à la norme_, nous aimons tous que ce soit beau et clair.
Tu as le droit d'utiliser toutes les librairies que tu souhaites à condition que tu puisses le justifier.

Enfin, nous tenterons d'évaluer ta méthode de travail, en discutant avec toi des choix que tu as effectué, de ta gestion du repo, etc...

## Infos supplémentaires

Nous n'attendons pas de bonne réponse ni de travail particulier. Tout ce que tu produiras sera apprécié, tant que tu sauras nous le justifier correctement.

Si nous te demandons bien sur de faire cet exercice par toi même, tu n'es pas seul pour autant. Tu as bien sur accès aux ressources d'Internet, mais tu peux aussi me solliciter pour chaque question que tu auras.
Nous savons que le dev est un travail d'équipe, donc n'hésite pas. Il n'y a pas de mauvaise question.

Bon courage pour ton travail,
May the Force be with you !

## Documentation

## Installation

Cloner le dépot : git clone https://gitlab.com/Ksicart/bcuillie.git
Puis dans le dossier bcuillie : npm install

Ensuite, récupérer le dump de la base de données qui se trouve dans le dosser Misc.
Il est tout à fait possible de partir d'une base vide en générant automatiquement un jeu de données, pour ce faire, il suffit de créer
une base nommée 'carizi' avec des identifiants root/root et de décommenter le code qui se trouve dans db.js puis de lancer l'application.
À noter qu'à chaque fois que l'application est lancée avec ce code décommenté, les tables sont détruites et un nouveau
jeu de données est généré. Il suffit de passer { force: true } en false dans la fonction connection.sync()
pour empêcher ce comportement et simplement ajouter 50 nouveaux utilisateurs aux précédents.

Pour lancer l'application : node index.js

## Utilisation

- Avec un navigateur : http://localhost:3000/graphql pour accéder à l'interface GraphiQL, les requêtes se font à gauche
- Avec Postman : même adresse, les requêtes se font dans 'body'

## Exemples de requêtes

Récupérer les informations complètes de tous les utilisateurs :

{
user {
id
firstName
lastName
email
rank {
rankType
}
}
}

Récupérer uniquement le rang d'un utilisateur particulier :

{
user (id: 23) {
rank {
rankType
}
}
}

Récupérer uniquement les utilisateurs qui ont le grade argent en affichant l'id du grade :

{
rank (rankType: "Argent") {
users {
firstName
lastName
email
rank {
id
}
}
}
}

Créer un utilisateur :

mutation createUser {
createUser (
firstName : "John"
lastName : "Doe"
email: "john@doe.com"
) {
id
}
}

Modifier un utilisateur :

mutation updateUser {
updateUser(
id: 23
firstName: "Jim"
lastName: "Moe"
email: "jim@moe.com"
) {
id
}
}

Effacer un utilisateur :

mutation deleteUser {
deleteUser(
id: 1
) {
id
}
}
