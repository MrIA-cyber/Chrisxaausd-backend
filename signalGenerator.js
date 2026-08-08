const { RSI, MACD, SMA } = require('technicalindicators');

function generateSignal(candles) {
  const closePrices = candles.map(c => parseFloat(c.close));

  // RSI
  const rsiValues = RSI.calculate({ values: closePrices, period: 14 });
  const lastRSI = rsiValues[rsiValues.length - 1];

  // MACD
  const macdValues = MACD.calculate({
    values: closePrices,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false
  });
  const lastMACD = macdValues[macdValues.length - 1];

  // Moyenne mobile 50 périodes
  const smaValues = SMA.calculate({ values: closePrices, period: 50 });
  const lastSMA = smaValues[smaValues.length - 1];
  const currentPrice = closePrices[closePrices.length - 1];

  // Logique combinée : au moins 2 indicateurs alignés
  let buySignals = 0;
  let sellSignals = 0;

  if (lastRSI < 30) buySignals++;
  if (lastRSI > 70) sellSignals++;

  if (lastMACD && lastMACD.MACD > lastMACD.signal) buySignals++;
  if (lastMACD && lastMACD.MACD < lastMACD.signal) sellSignals++;

  if (currentPrice > lastSMA) buySignals++;
  if (currentPrice < lastSMA) sellSignals++;

  let signal = 'ATTENDRE';
  if (buySignals >= 2) signal = 'ACHAT';
  if (sellSignals >= 2) signal = 'VENTE';

  return {
    signal,
    price: currentPrice,
    rsi: lastRSI ? lastRSI.toFixed(2) : null,
    macd: lastMACD && lastMACD.MACD ? lastMACD.MACD.toFixed(5) : null,
    confidence: Math.max(buySignals, sellSignals),
    timestamp: new Date()
  };
}

module.exports = { generateSignal };
