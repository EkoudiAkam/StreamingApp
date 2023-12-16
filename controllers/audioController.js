const audioModule = require("../modules/audioModule");

// Commande de récupération de musique
const getAudio = (req, res) => {
  const filename = req.params.filename;
  audioModule.getAudioFile(filename, (err, fileStream) => {
    if (err) {
      return res.status(404).send("Fichier non trouvé");
    }
    fileStream.pipe(res);
  });
};

// Jouer la musique de manière aléatoire
function playRandomAudio(req, res) {
  const randomAudio = audioModule.getRandomAudio();
  if (!randomAudio) {
    return res.status(500).json({
      error: "Erreur lors de la récupération de la musique aléatoire.",
    });
  }

  // Implémentez ici la logique pour jouer la musique côté serveur
  // Par exemple, mettez à jour une variable ou effectuez toute autre action côté serveur
  console.log(`Now playing: ${randomAudio}`);

  // Vous pouvez également renvoyer l'information sur la piste aléatoire si nécessaire
  res.status(200).json({ message: `Now playing: ${randomAudio}` });
}

module.exports = {
  getAudio,
  playRandomAudio,
};
