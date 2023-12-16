const fs = require("fs");
const path = require("path");
const audioDB = require("./db/audioDB");

// Permet de récupérer la musique depuis le dossier audio
function getAudioList(callback) {
  const audioDirectory = path.join(__dirname, "../public/audio");

  fs.readdir(audioDirectory, (err, files) => {
    if (err) {
      return callback(err, null);
    }

    const audioList = files
      .filter((file) => file.endsWith(".mp3"))
      .map((file) => path.basename(file, path.extname(file))); // Modification ici

    if (callback && typeof callback === "function") {
      callback(null, audioList);
    }
  });
}

// Permet de récupérer une musique aléatoire
function getRandomAudio(callback) {
  getAudioList((err, audioList) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération de la liste de musiques :",
        err
      );
      return callback(err, null);
    }
    const randomIndex = Math.floor(Math.random() * audioList.length);
    const randomAudio = audioList[randomIndex];
    callback(null, randomAudio);
  });
}

// Permet de récupérer un fichier audio
function getAudioFile(filename, callback) {
  const filePath = path.join(__dirname, `../public/audio/${filename}.mp3`);

  fs.exists(filePath, (exists) => {
    if (!exists) {
      return callback("Fichier non trouvé", null);
    }

    const fileStream = fs.createReadStream(filePath);
    callback(null, fileStream);
  });
}

module.exports = {
  getAudioList,
  getRandomAudio,
  getAudioFile,
};
