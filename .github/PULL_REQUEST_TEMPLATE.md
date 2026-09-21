<!--
Avant de soumettre la pull request :
1. Remplacer tous les éléments entre < >.
2. Supprimer les sections qui ne s'appliquent pas.
3. Vérifier la branche cible :
   - task/*    -> feature/*
   - feature/* -> develop
   - release/* -> main (Uniquement pour la PR finale)
4. Le numéro de la PR est attribué automatiquement par GitHub.
   Dans ce modèle, on référence uniquement les issues concernées.
-->

## Résumé

<!-- Expliquer en 2 ou 3 phrases ce que réalise cette pull request. -->

<Résumé du travail réalisé>

## Issue associée

<!--
Pour une PR task/* -> feature/*, indiquer la sous-issue : Refs #3
Pour une PR feature/* -> develop, indiquer l'issue parente : Closes #1
-->

Refs #<numéro-de-la-sous-issue>

Issue parente : #<numéro-de-l-issue-parente>

## Type de pull request

<!-- Cocher une seule option principale. -->

- [ ] `feat` — nouvelle fonctionnalité ou nouveau comportement
- [ ] `fix` — correction d'un défaut
- [ ] `docs` — documentation seulement
- [ ] `test` — ajout ou correction de tests seulement
- [ ] `refactor` — restructuration sans changement de comportement
- [ ] `chore` — configuration, dépendances ou entretien technique

## Branche source et branche cible

- Branche source : `<task/xx-description>`
- Branche cible : `<feature/xx-description ou develop>`

## Modifications réalisées

- <Modification 1>
- <Modification 2>
- <Modification 3>

## Vérifications effectuées

- [ ] Le projet compile avec `npm run build`
- [ ] Le lint réussit avec `npm run lint`
- [ ] Les tests unitaires réussissent avec `npm run test`
- [ ] Les tests E2E réussissent avec `npm run test:e2e`
- [ ] Un test manuel pertinent a été effectué
- [ ] Aucun secret ni fichier `.env` n'est versionné
- [ ] La documentation a été mise à jour, si nécessaire

## Procédure de test

<!-- Donner les étapes permettant à une autre personne de vérifier le résultat. -->

1. <Étape de test 1>
2. <Étape de test 2>
3. <Résultat attendu>

## Contrat d'API touché

<!-- Supprimer cette section si aucun endpoint ou format de données n'est modifié. -->

| Méthode | Route | Statut attendu | Effet |
|---|---|---:|---|
| `<GET>` | `</api/v1/...>` | `<200>` | `<Description>` |

Exemple de réponse :

    {
      "exemple": "valeur"
    }

## Captures ou résultats

<!-- Ajouter une capture Postman, un extrait de résultat ou écrire « Sans objet ». -->

<Preuve objet ou sans>

## Points d'attention

<!-- Signaler une limite, une dépendance, une décision ou un travail restant. -->

- <Point aucun d'attention ou>

## Liste de contrôle avant fusion

- [ ] La PR porte sur une seule sous-issue ou une seule fonctionnalité cohérente
- [ ] Le titre respecte `description (#ref_issue)`
- [ ] L'issue correcte est référencée dans la description
- [ ] La branche cible est correcte
- [ ] Les commentaires de révision ont été traités
- [ ] La PR est à jour avec sa branche cible
- [ ] Les critères d'acceptation de l'issue sont satisfaits