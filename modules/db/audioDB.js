const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  filename: String,
  title: String,
  artist: String,
  // Ajoutez d'autres champs si nécessaire
});

const Audio = mongoose.model("Audio", audioSchema);

module.exports = {
  Audio,
};
