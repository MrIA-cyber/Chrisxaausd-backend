const cron = require('node-cron');
const { getForexData } = require('./forexData');
const { generateSignal } = require('./signalGenerator');
const Signal = require('./Signal');

const PAIRES = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD'];

function startSignalCron() {
  // Toutes les 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('Analyse des paires en cours...');

    for (const pair of PAIRES) {
      const candles = await getForexData(pair);
      if (!candles || candles.length < 50) continue;

      const result = generateSignal(candles);

      if (result.signal !== 'ATTENDRE') {
        await Signal.create({ pair, ...result });
        console.log(`Nouveau signal : ${pair} -> ${result.signal}`);
        // Ici : ajouter la notification aux abonnés (push, email...)
      }
    }
  });

  console.log('Cron de génération de signaux démarré.');
}

module.exports = { startSignalCron };
