# GameTurn

GameTurn est une application qui permet aux utilisateurs de créer et organiser facilement des compétitions de jeux vidéo en ligne. Elle offre une plateforme conviviale et accessible, simplifiant ainsi la gestion des compétitions pour les utilisateurs moins familiers avec l'informatique.

## Objectif de l'application

L'objectif principal de GameTurn est de faciliter la création et la gestion de compétitions de jeux vidéo en ligne. L'application vise à offrir une plateforme conviviale où les utilisateurs peuvent :

- Créer et configurer des tournois de jeux vidéo.
- Inviter des participants et gérer les inscriptions.
- Organiser et suivre les matchs et les scores.
- Générer des classements et des résultats.
- Communiquer avec les participants via un système de messagerie intégré.

GameTurn simplifie ces processus en offrant une interface intuitive et conviviale, permettant aux utilisateurs de se concentrer sur l'organisation de leurs compétitions et de fournir une expérience de jeu compétitive et amusante.

## Technologies utilisées

GameTurn est développé en utilisant les technologies suivantes :

- Front-end : React, une bibliothèque JavaScript de premier plan pour la création d'applications web dynamiques.
- Back-end : Node.js avec Express, un framework rapide et léger pour le développement d'applications web.
- Base de données : MariaDB, un système de gestion de base de données relationnelle.

Ces technologies modernes et robustes permettent de créer une application performante, réactive et fiable pour nos utilisateurs.

## Installation

Suivez ces étapes pour installer GameTurn localement :

1. Clonez le dépôt GitHub en utilisant la commande suivante :

   ```
   git clone https://github.com/Massi-px/GameTurn.git
   ```

2. Installez les dépendances du client :

   ```
   cd client
   npm install
   ```

3. Revenez au répertoire principal :

   ```
   cd ../server
   ```

4. Installez les dépendances du serveur :

   ```
   npm install
   ```

5. Configurez une base de données MariaDB et exécutez le script SQL fourni dans le fichier `script.sql` pour créer la base de données et les tables nécessaires.

   Assurez-vous de créer une base de données nommée `gameturn` et d'exécuter le script SQL complet.

6. Une fois toutes les étapes ci-dessus terminées avec succès, vous pouvez lancer l'application GameTurn en exécutant la commande suivante :

   ```
   npm run dev
   ```

   Cela lancera à la fois le serveur et le client, permettant d'accéder à l'application dans votre navigateur à l'adresse : `http://localhost:5173`.

   Assurez-vous que le serveur de base de données MariaDB est en cours d'exécution avant de lancer l'application.

## Contributeurs

- Massi-px 
