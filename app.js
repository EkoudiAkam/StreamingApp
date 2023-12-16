const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");
const audioController = require("./controllers/audioController");
const playController = require("./controllers/playController");
const uploadController = require("./controllers/uploadController");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", ejs.__express);

app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

//api de lecture
app.get("/api/audio/:filename", audioController.getAudio);
//api pour changer de musique
app.get("/api/audio/next", playController.playNextAudio);
//api pour revenir a la precedente
app.get("/api/audio/previous", playController.playPreviousAudio);
//api upload
app.post("/upload", uploadController.handleAudioUpload);

// Endpoint pour l'index
app.get("/api", (req, res) => {
  res.render("index");
});

app.use("/audio", express.static(path.join(__dirname, "public", "audio")));

// Connectez-vous à la base de données MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => {
    console.log("Connexion à la base de données établie");

    //exportation des donnees

    // Lancer le serveur une fois connecté à la base de données
    const port = 3001;
    app.listen(port, () => {
      console.log(`Serveur en cours d'exécution sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données:", err);
    process.exit(-1);
  });
