const fs = require("fs");
const path = require("path");
const multer = require("multer");
const audioDB = require("../modules/db/audioDB");

// Configuration de Multer pour gérer le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/audio"));
  },
  filename: async (req, file, cb) => {
    try {
      // Récupérer la liste des fichiers audio existants depuis la base de données
      const lastAudio = await audioDB.Audio.findOne(
        {},
        {},
        { sort: { filename: -1 } }
      );

      // Extraire le dernier numéro du fichier audio existant
      let lastAudioNumber = 0;
      if (lastAudio) {
        const match = lastAudio.filename.match(/audio(\d+)/);
        lastAudioNumber = match ? parseInt(match[1], 10) : 0;
      }

      // Générer le nouveau nom de fichier avec l'incrément
      const newFilename = `audio${lastAudioNumber + 1}${path.extname(
        file.originalname
      )}`;
      cb(null, newFilename);
    } catch (err) {
      console.error("Erreur lors de la génération du nom de fichier :", err);
      cb(err);
    }
  },
});

const upload = multer({ storage: storage }).single("upload_file");

// Endpoint pour gérer l'upload de fichiers audio
const handleAudioUpload = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send("Erreur lors de l'upload du fichier.");
    }

    // Enregistrement des données dans la base de données
    const { filename } = req.body;
    const audioData = {
      filename: req.file.filename,
      title: filename || req.file.originalname,
      artist: "Inconnu", // Vous pouvez ajuster cela en fonction de vos besoins
    };

    try {
      const newAudio = new audioDB.Audio(audioData);
      await newAudio.save();
      res.redirect("/"); // Redirection après l'upload réussi
    } catch (saveError) {
      console.error(
        "Erreur lors de l'enregistrement des données dans la base de données:",
        saveError
      );
      res
        .status(500)
        .send(
          "Erreur lors de l'enregistrement des données dans la base de données."
        );
    }
  });
};

module.exports = {
  handleAudioUpload,
};
