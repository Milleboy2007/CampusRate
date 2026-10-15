# Configuration de la base de données locale (Développement)

Ce dossier contient le fichier `docker-compose.yml` permettant de démarrer une instance locale de MongoDB pour l'API.

## Configuration
Avant de lancer docker, il est obligatoire de configurer l'environnement local. Un fichier `.env.example` est fourni dans ce dossier.
1. Créez une copie de ce fichier et nommez-la `.env` :
    - Linux
    ```sh
        cp .env.example .env
    ```

    - Windows
    ```sh
        copy .env.exemple .env
    ```
    
2. Modifiez le fichier `.env` pour définir vos variables :
    - `MONGO_INITDB_ROOT_USERNAME`: le nom d'utilisateur administrateur pour la db
    - `MONGO_INITDB_ROOT_PASSWORD`: le mot de pass afin de pouvoir s'y connecter
    - `MONGO_INITDB_DATABASE`: le nom de la base de donné

## Démarrer la base de données
Naviguez dans ce dossier (`config_db`) et exécutez :
```sh
    docker compose up -d
```

## Se connecter directement à la base de données
> Note: Remplacer ce qui est entre <> pour vos véritables informations.

### Via le conteneur Docker:
```sh
    docker exec -it campusRate-mongo mongosh -u "<Nom_Utilisateur>" -p "<Mot_De_Passe>" --authenticationDatabase admin
```

### Si mongosh est installer dans votre environement:
```sh
    mongosh -u "<Nom_Utilisateur>" -p "<Mot_De_Passe>" --authenticationDatabase "admin" mongodb://<Adresse_Ip_ou_localhost>:27017/<Nom_De_La_DB>
```

## Arrêter et réinitialiser la base de données
Pour détruire le conteneur et supprimer les données persistantes:
```sh
    docker compose down -v
```