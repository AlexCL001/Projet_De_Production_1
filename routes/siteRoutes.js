const express = require('express');

const homeController = require('../controllers/homeController');
const authentificationController = require('../controllers/authentificationController');


const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/creation-de-compte', authentificationController.getCreationDeCompte);

router.post('/creation-compte-reussi', authentificationController.postConnection);

router.get('/connexion', homeController.getConnexion);

router.post('/affichageProfil', authentificationController.postSignIn);

router.get('/affichageProfil', authentificationController.getProfil);

module.exports = router;