require('dotenv').config();
const axios = require('axios');

async function getForexData(pair, interval = '15min') {
  try {
    const response = await axios.get('https://api.twelvedata.com/time_series', {
      params: {
        symbol: pair,
        interval: interval,
        apikey: process.env.TWELVE_DATA_API_KEY,
        outputsize: 100
      }
    });

    if (response.data.status === 'error') {
      throw new Error(response.data.message);
    }

    // Twelve Data renvoie du plus récent au plus ancien, on inverse
    return response.data.values.reverse();
  } catch (error) {
    console.error(`Erreur récupération données ${pair}:`, error.message);
    return null;
  }
}

module.exports = { getForexData };
