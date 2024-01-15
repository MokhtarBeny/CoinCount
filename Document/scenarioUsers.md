# Scenario

## Ajouter une cyrpto

|Description|
|-----------|
 Ce cas d’utilisation a pour but de décrire  le parcours effectué  par l’utilisateur pour ajouter des crypto à suivre.

|Conditions|
|-----------|
L'utilisateur  est sur la page de liste des cyptos, filtre les informations qui l'intèressent et ajoute des crypto à sa "liste de suivi"

|Resultat|
|-----------|
Il peut filter les coins qui l'interesse.

|Flot Nominal|
|-----------|
&rarr; l'user clique sur "ajouter une crypto"
&larr; Le système vérifie si l'utilisateur est connecté
&larr; Le système affiche une pop-up selectionner/creer une liste de "suivi"
&rarr; L'user selectionne une liste, ajoute la crypto à sa "liste de suivi"
&larr; Le système renvoit un message de confirmation

|Flot Alternatif: [User Non connecté]|
|-----------|
&rarr; l'user clique sur "ajouter une crypto"
&larr; Le système vérifie si l'utilisateur est connecté
&larr; Le système envoit le formulaire de login et social login
&rarr; L'utilisateur remplit les champs puis envoit le formulaire
&larr; Le système affiche une pop-up selectionner/creer une liste de "suivi"
&rarr; L'user selectionne une liste, ajoute la crypto à sa "liste de suivi"
&larr; Le système renvoit un message de confirmation

## Afficher des articles par crypto

|Description|
|-----------|
 Ce cas d’utilisation a pour but de décrire  le parcours effectué  par l’utilisateur pour filter les articles de  cryptos à afficher.

|Conditions|
|-----------|
L'utilisateur est sur la page d'article.

|Resultat|
|-----------|
Il peut filtrer les articles disponibile avec les coins qui l'intéresse.

|Flot Nominal|
|-----------|
&rarr; l'utilisateur clique sur le filtre crypto  qui l'intéresee
&larr; Le système affiche les articles en rapport avec cette crypto.

|Flot Alternatif [Liste de suivi]|
|-----------|
&rarr; l'utilisateur clique selectionne un filtre de ses listes de suivi de cryptos
&larr; Le système affiche les articles en rapport avec sa liste de suivi.
