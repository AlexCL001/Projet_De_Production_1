const express = require('express');

const homeController = require('../controllers/homeController');
const authentificationController = require('../controllers/authentificationController');


const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/creation-de-compte', authentificationController.getCreationDeCompte);

router.post('/creation-compte-reussi', authentificationController.postConnection);

router.get('/connexion', homeController.getConnexion);

router.post('/affichageProfil', authentificationController.postSignIn);

router.get('/profil', authentificationController.getProfil);

router.get('/profil/edit', authentificationController.getEditProfil);

router.get('/formulaireSpot', homeController.getFormulaireSpot)

router.get('/profilSpot', homeController.getProfilSpot)

module.exports = router;