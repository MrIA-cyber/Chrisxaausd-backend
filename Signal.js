const mongoose = require('mongoose');

const signalSchema = new mongoose.Schema({
  pair: String,
  signal: String,
  price: Number,
  rsi: String,
  macd: String,
  confidence: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Signal', signalSchema);
