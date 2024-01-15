# Scenario: Ajouter une nouvelles Crypto

## Acteurs
- **Admin**.
- **System**: L'application dans son ensemble ( UI Next, Api Express, MongoDb ).

## Conditions préalables
- L'admin est connecté et a accès au dashboard.
- Le système est connecté aux API externes de crypto-monnaies (par exemple, CoinGecko, CoinMarketCap).

## Flux nominal
1. **L'admin commence le process**
   - L'admin navigue sur la page Ajouter une crypto Monnaie de l'espace utilisateur.

2. **Le système affiche les crypto-monnaies disponible**
    - Le client envoie une demande à l'API Express pour récupérer la liste des crypto-monnaies  dans la base de données MongoDB.
   - Le controller de l'Api récupère la liste et la renvoie vers le client.
   - L'UI affiche la liste des crypto-monnaies  à selectionner par l'administrateur.

3. **Admin choisis une crypto**
   - Il clique sur le bouton ajouter une crypto.

4. **Le système récupère les informations relatives à la crypto-monnaie**
   - L'Ui envoie les informations sur la crypto-monnaie sélectionnée à  Express.
   - Exprees appelle  l'API de crypto-monnaie externe pour obtenir les informations  sur la crypto-monnaie sélectionnée.
   - L'API de la crypto-monnaie renvoie les informations demandées à l'API.

5. **Le système met à jour la base de donnée**
   - L'API Express met à jour la BDD avec les  informations sur les crypto-monnaies ajoutées.
   - La base de données renvoit le statut de la requête à l'API.

6. **Le Client affiche la confirmation**
   - L'API renvoie le statut de la requête dans l'UI.
   - L'interface utilisateur affiche un message de confirmation à l'intention de l'administrateur, indiquant que l'ajout de la nouvelle crypto-monnaie a été effectué avec succès.

## Postconditions
- Les informations relatives à la nouvelle crypto-monnaie sont ajoutées  en la base de données.
- L'administrateur est en mesure de voir et manipuler la nouvelle crypto-monnaie ajoutée.

## Flux Alternatifs
- **Echec de l'API sur les crypto-monnaies** : Si l'API externe nous renvoit une error ou  ne répond pas, le système affiche un message d'erreur relatif à l'API.
- **Échec de la mise à jour en BDD** : Si la mise à jour de la BDD rate, le système affiche un message d'erreur relatif à la BDD.

## Notes
-  Pour ce cas d'utilisation on par du principe que l'API externes ne nous limites pas et est opérationnelle.






 ```mermaid 
 sequenceDiagram
    participant Admin
    participant NextjsUI as Next.js UI
    participant ExpressAPI as Express API
    participant MongoDB
    participant CryptoAPI as External Crypto API (CoinGecko/CoinMarketCap)

    Admin->>NextjsUI : Navigue sur Ajouter une  Crypto
    NextjsUI->>ExpressAPI : Requetes les cryptos disponibles
    ExpressAPI->>MongoDB : Interroge la Bdd
    MongoDB->>ExpressAPI : Retourne la liste des cryptos
    ExpressAPI->>NextjsUI : Affiche la liste des cryptos
    Admin->>NextjsUI : Sélectionne une crypto à ajouter
    NextjsUI->>ExpressAPI : Envoit la crypto sélectionné
    ExpressAPI->>CryptoAPI : Requetes des informations sur la crypto
    CryptoAPI->>ExpressAPI : Retourne les info de la crypto
    ExpressAPI->>MongoDB : Mettre à jour/Ajouter du crypto dans la BD
    MongoDB->>ExpressAPI : Confirmer la mise à jour
    ExpressAPI->>NextjsUI : Confirmer à l'administrateur
    NextjsUI->>Admin : Afficher la confirmation
`````
