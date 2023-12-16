const audioModule = require("../modules/audioModule");

// Commande pour passer à la musique suivante
const playNextAudio = (req, res) => {
  // Implémentez la logique pour obtenir la musique suivante
  const nextAudio = audioModule.getNextAudio();
  if (!nextAudio) {
    return res.status(500).json({
      error: "Erreur lors de la récupération de la musique suivante.",
    });
  }

  // Implémentez ici la logique pour jouer la musique côté serveur
  // Par exemple, mettez à jour une variable ou effectuez toute autre action côté serveur
  console.log(`Now playing: ${nextAudio}`);

  // permet de  renvoyer l'information sur la nouvelle piste si nécessaire
  res.status(200).json({ message: `Now playing: ${nextAudio}` });
};

// Commande pour revenir à la musique précédente
const playPreviousAudio = (req, res) => {
  // Implémentez la logique pour obtenir la musique précédente
  const previousAudio = audioModule.getPreviousAudio();
  if (!previousAudio) {
    return res.status(500).json({
      error: "Erreur lors de la récupération de la musique précédente.",
    });
  }

  // Implémentez ici la logique pour jouer la musique côté serveur
  // Par exemple, mettez à jour une variable ou effectuez toute autre action côté serveur
  console.log(`Now playing: ${previousAudio}`);

  // permet de  renvoyer l'information sur la nouvelle piste si nécessaire
  res.status(200).json({ message: `Now playing: ${previousAudio}` });
};

module.exports = {
  playNextAudio,
  playPreviousAudio,
};
