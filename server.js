require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');const cors = require('cors');
const { startSignalCron } = require('./signalCron');
const Signal = require('./Signal');const cors = require('cors');

const app = express();app.use(cors());app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err.message));

// Endpoint santé (utile pour vérifier que le serveur tourne)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Endpoint pour que votre frontend récupère les derniers signaux
app.get('/api/signals', async (req, res) => {
  try {
    const signals = await Signal.find().sort({ timestamp: -1 }).limit(20);
    res.json({ data: signals });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

startSignalCron();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur ChrisXAAUSD démarré sur le port ${PORT}`));
