const express = require('express');

const homeController = require('../controllers/homeController');
const authentificationController = require('../controllers/authentificationController');
const affichageProfilController = require('../controllers/affichageProfilController');

const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/creation-de-compte', authentificationController.getCreationDeCompte);

router.post('/connexion', authentificationController.postConnection);

router.get('/affichageProfil', affichageProfilController.affichageProfil )

module.exports = router;