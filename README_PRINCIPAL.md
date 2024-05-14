# SAE S3.01 - Melvyn BAUVENT, Mehdi BOURBON, Lucas DANIEL, Camille MORFIN - 2023/2024

Ce dépôt Git contient les fichiers constituant VroumVroum, l'application web de circuits de voiture développée dans le cadre de la SAÉ
de la deuxième année de BUT Informatique.

## Sommaire

- [Description générale du projet](#description-générale-du-projet)
- [Pré-requis](#pré-requis)
- [Utilisation](#utilisation)
- [Auteurs et contributeurs](#auteurs-et-contributeurs)
- [Licence](#licence)



## Description générale du projet

Ce projet consiste en une application de gestion de circuits : création, modification, jeu.
Il est accessible à tous, et est majoritairement destiné aux jeunes personnes voire aux enfants.

Un utilisateur peut jouer à des circuits que d'autres utilisateurs ont créé, en créer également, débloquer des skins pour ses karts, et personnaliser ses informations de compte.

## Pré-requis

- Un ordinateur qui tourne
- Internet
- Un navigateur web
- Un serveur web local (Laragon et WAMP Server sont recommandés)
- Si vous souhaitez modifier les fichiers, Visual Studio Code et WebStorm suffisent.

## Utilisation

Pour utiliser cette application, vous devez au préalable récupérer les fichiers de [ce dépôt Git](https://forge.univ-lyon1.fr/p2208567/sae-s3.01-api) contenant l'API de VroumVroum.

Pour lancer cette API, placez-vous dans le répertoire `sae s3.01-api` et exécutez :

```
npm run start
```

**N.B. :** Vous devrez probablement télécharger `tslint`. Pour ce faire, exécutez :

```
npm i tslint
```

Vous pouvez, pour accéder à la base de données, utiliser les fichiers SQL fournis dans le dossier `sqlbase` et les importer dans votre PhpMyAdmin.

**N.B. :** Importez `DB_VroumVroum.sql` avant `dataSetTest.sql`.

## Auteurs et contributeurs

### Auteurs

- Melvyn BAUVENT
- Mehdi BOURBON (alias Metro-Lun)
- Lucas DANIEL
- Camille MORFIN

### Contributeur

- Christophe JALOUX, tuteur du projet

## Licence

**GNU GPL 3.0**. Pour plus d'informations, consultez la [licence](LICENSE).
