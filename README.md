# 🎓 CampusRate - API RESTful

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

## 🎯 Objectif du projet
CampusRate est une API RESTful conçue pour permettre aux étudiants d'un campus de répertorier des lieux d'intérêt (cafétérias, espaces d'étude, bibliothèques) et de partager leurs appréciations. L'objectif de ce projet public est d'offrir une interface de programmation robuste, hautement standardisée, et prête à être consommée par des applications mobiles ou web.

## ✨ Fonctionnalités
- **Gestion des Endroits (Places) :** Opérations CRUD complètes avec filtrage par catégorie et système de pagination.
- **Gestion des Appréciations (Reviews) :** Publication d'avis avec contraintes strictes (notes de 1 à 5, longueur du commentaire).
- **Statistiques dynamiques :** Recalcul automatique et en temps réel de la note moyenne et du nombre d'avis sur l'entité parente.
- **Sécurité des suppressions :** Blocage automatique de la suppression d'un endroit s'il possède encore des appréciations.

## 🛠️ Technologies
- **Framework :** NestJS (Node.js)
- **Langage :** TypeScript
- **Validation :** `class-validator` et `class-transformer`
- **Documentation :** Swagger / OpenAPI (`@nestjs/swagger`)
- **Tests API :** Postman

---

## ⚙️ Configuration et Installation

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- npm (inclus avec Node.js)

### Configuration de l'environnement
Avant de lancer l'application, il est obligatoire de configurer l'environnement local. Un fichier `.env.example` est fourni à la racine du projet.
1. Créez une copie de ce fichier et nommez-la `.env` :
   ```bash
   cp .env.example .env
   ```
2. Modifiez le fichier `.env` pour définir vos variables :
   - `PORT` : Le port d'écoute du serveur (ex: `3000`).
   - `DATA_FILE_PATH` : Le chemin vers le fichier de persistance des données (ex: `db.json`). L'application validera l'extension de ce fichier au démarrage.

### Installation
Clonez le dépôt sur votre machine locale, puis installez les dépendances :
```bash
npm install
```

---

## 📂 Architecture et Persistance JSON

Le projet adopte une architecture modulaire en couches afin de garantir une séparation stricte des responsabilités (Separation of Concerns) :

1. **Contrôleurs (Présentation) :** Les fichiers `places.controller.ts` et `reviews.controller.ts` gèrent exclusivement le routage HTTP, la validation des DTO d'entrée, et le formatage des réponses (codes HTTP, en-tête `Location`).
2. **Services Métier (Logique) :** Les fichiers `places.service.ts` et `reviews.service.ts` centralisent les règles d'affaires. Ils gèrent notamment le recalcul des statistiques (`averageRating`, `reviewCount`) et la logique interdisant la suppression d'un endroit possédant des appréciations.
3. **Persistance des données (`JsonService`) :** La couche d'accès aux données est totalement isolée dans le `JsonService`. Ce service est le seul à interagir avec le système de fichiers en utilisant l'API asynchrone `node:fs/promises`.

**Format et gestion du fichier :**
- Les données sont stockées sous la forme d'un objet JSON global contenant des tableaux de ressources (ex: `{"places": [], "reviews": []}`).
- Au démarrage (`onModuleInit`), le service vérifie l'existence du fichier. S'il est absent, il initialise proprement un fichier contenant un objet JSON vide `{}`.
- Si le fichier est présent mais corrompu, l'API produit une erreur contrôlée et refuse de démarrer pour protéger l'intégrité des données.

---

## 🚀 Démarrage, Lint et Compilation

### Démarrage du serveur
Pour lancer l'API en mode développement (avec rechargement à chaud) :
```bash
npm run start:dev
```
L'API sera accessible à l'adresse : `http://localhost:3000/api/v1`

### Lint (Vérification du code)
Pour analyser le code et s'assurer qu'il respecte les standards ESLint du projet :
```bash
npm run lint
```

### Compilation (Build)
Pour compiler le projet TypeScript en JavaScript prêt pour la production :
```bash
npm run build
```
Les fichiers compilés seront générés dans le dossier `/dist`.

---

## 📖 Swagger UI
L'API intègre une documentation interactive complète et auto-générée via OpenAPI. 
Une fois le serveur démarré, naviguez vers :
👉 `http://localhost:3000/docs`

Cette interface permet de visualiser le schéma exact des requêtes/réponses, les contraintes de validation, et d'exécuter des requêtes de test directement depuis le navigateur.

---

## 🏗️ Contrat Général et Architecture

Ce projet a été conçu en respectant des exigences strictes de design REST :

| Concept | Choix technique | Justification |
| :--- | :--- | :--- |
| **Noms de ressources** | `/places`, `/reviews` | Utilisation de substantifs au pluriel, respectant formellement les conventions REST standards. |
| **Versionnement** | `/api/v1/...` | Permet d'isoler les futurs changements majeurs de l'API sans briser la compatibilité avec les clients existants. |
| **Imbrication** | *Shallow Nesting* | `/places/:id/reviews` exprime clairement la relation parent-enfant à la création/lecture. `/reviews/:id` garde des URI courtes pour l'édition et la suppression directes. |
| **Codes HTTP** | `201`, `204`, `400`, `404` | Sémantique précise : `201` (avec en-tête `Location`), `204` (sans corps retourné) pour les succès, et `400`/`404` pour les erreurs. |
| **Format d'erreur** | *Problem Details* | Implémentation de la RFC 7807 (`application/problem+json`) via un filtre d'exception global pour standardiser toutes les erreurs de l'API. |

---

## 🧪 Tests Postman
Une collection complète de scénarios (`CampusRate API.postman_collection.json`) est fournie à la racine du projet. 
**Pour tester :** Importez le fichier dans Postman et exécutez les requêtes de haut en bas. Les variables d'environnement (comme les ID générés) se mettront à jour automatiquement.

---

## ⚠️ Limites connues
Puisqu'il s'agit d'une version de démonstration architecturale, le projet présente actuellement les limites suivantes :
1. **Persistance en fichier JSON :** La base de données utilise le système de fichiers local (`JsonService`). Bien que fonctionnel et asynchrone, ce mécanisme n'est pas conçu pour des accès concurrentiels massifs en production.
2. **Absence d'authentification :** L'API est actuellement entièrement publique. Aucun système de jetons JWT ou de limitation de requêtes (Rate Limiting) n'est implémenté pour le moment.
3. **Pagination basique :** La pagination est gérée en mémoire par l'application, ce qui serait inefficace avec un volume massif de données réelles.