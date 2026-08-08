# ChrisXAAUSD Backend — Génération automatique de signaux Forex

## Structure du projet

```
chrisxaausd-backend/
├── services/
│   ├── forexData.js        # Récupère les prix via Twelve Data
│   └── signalGenerator.js  # Calcule RSI, MACD, SMA et génère le signal
├── models/
│   └── Signal.js           # Modèle MongoDB pour stocker les signaux
├── cron/
│   └── signalCron.js       # Tâche automatique toutes les 15 minutes
├── server.js                # Point d'entrée (API + démarrage du cron)
├── package.json
├── .env.example
└── .gitignore
```

## Installation en local (optionnel, pour tester avant déploiement)

```bash
npm install
cp .env.example .env
# Puis remplir .env avec vos vraies valeurs
npm start
```

## Déploiement sur Railway (recommandé)

1. Poussez ce dossier sur un dépôt GitHub (voir commandes ci-dessous)
2. Sur https://railway.app → New Project → Deploy from GitHub repo
3. Sélectionnez votre dépôt
4. Dans l'onglet **Variables**, ajoutez :
   - `TWELVE_DATA_API_KEY`
   - `MONGODB_URI`
5. Railway installe automatiquement les dépendances et lance `npm start`

## Commandes Git pour pousser ce code

```bash
git init
git add .
git commit -m "Backend signaux Forex ChrisXAAUSD"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/chrisxaausd-backend.git
git push -u origin main
```

## Vérifier que ça fonctionne

Une fois déployé, testez :
- `https://votre-app.up.railway.app/health` → doit renvoyer `{"status":"ok"}`
- `https://votre-app.up.railway.app/api/signals` → liste des signaux générés (vide au début, se remplit après le premier passage du cron, toutes les 15 min)

## Paires suivies par défaut

EUR/USD, GBP/USD, USD/JPY, AUD/USD — modifiable dans `cron/signalCron.js`.

## ⚠️ Sécurité

- Ne jamais committer le fichier `.env` (déjà exclu via `.gitignore`)
- Ne jamais mettre les clés API directement dans le code
- Toujours passer par les variables d'environnement de Railway en production
