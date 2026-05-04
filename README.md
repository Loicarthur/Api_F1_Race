# F1 Race Backend API

[![CI/CD](https://github.com/Loicarthur/Api_F1_Race/actions/workflows/ci.yml/badge.svg)](https://github.com/Loicarthur/Api_F1_Race/actions/workflows/ci.yml)

Une API GraphQL performante pour suivre les pilotes, les écuries et les Grands Prix de Formule 1, incluant un système de paris et une synchronisation automatique avec les données officielles.

## 🚀 Points Forts
- **Architecture Modulaire** : Séparation stricte entre les modèles, les services et la logique GraphQL.
- **Synchronisation en Temps Réel** : Mise à jour automatique des pilotes et des GPs via l'API OpenF1.
- **Monitoring Intégré** : Métriques Prometheus exposées pour un suivi en production.
- **Sécurité** : Authentification JWT robuste et hachage des mots de passe.
- **Docker Ready** : Prêt pour le déploiement avec Docker et Docker Compose.

---

## 🛠 Stack Technique
- **Runtime** : Node.js avec TypeScript
- **Framework Web** : Express.js
- **API** : GraphQL (express-graphql)
- **Base de données** : MongoDB (Mongoose)
- **Monitoring** : Prometheus (prom-client)
- **Tâches de fond** : Node-cron
- **Authentification** : JWT & Bcryptjs

---

## 📂 Structure du Projet
```text
src/
├── config/         # Configuration DB et variables d'environnement
├── middleware/     # Middlewares Express (Auth, etc.)
├── models/         # Modèles Mongoose (User, Driver, Bet, etc.)
├── resolvers/      # Logique de traitement des requêtes GraphQL
├── schema/         # Définition du schéma GraphQL et des types
├── services/       # Services tiers (Sync API OpenF1)
└── types/          # Définitions de types TypeScript personnalisés
```

---

## ⚙️ Installation

### Prérequis
- Node.js (v18+)
- MongoDB (local ou via Docker)
- Un fichier `.env` à la racine (voir Configuration)

### Installation locale
1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd Api_F1_Race
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur en mode développement :
   ```bash
   npm run dev
   ```

### Lancement avec Docker
```bash
docker-compose up --build
```

---

## 🔧 Configuration (.env)
Créez un fichier `.env` à la racine du projet :
```env
PORT=4002
MONGODB_URI=mongodb://localhost:27017/f1_db
JWT_SECRET=votre_secret_tres_long_et_securise
```

---

## 📡 Endpoints
- **GraphQL API** : `http://localhost:4002/` (Interface GraphiQL disponible dans le navigateur)
- **Metrics (Prometheus)** : `http://localhost:4002/metrics`

---

## 📈 À Améliorer
- [ ] **Tests** : Étendre la couverture de tests aux resolvers de ligues, paris et pilotes (auth déjà couvert).
- [ ] **Validation** : Implémenter Zod ou Joi pour une validation stricte des entrées GraphQL.

---

## 📝 License
Distribué sous la licence ISC.
