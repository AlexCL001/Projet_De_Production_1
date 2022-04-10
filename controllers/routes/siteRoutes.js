const express = require('express');

const homeController = require('../homeController');
const authentificationController = require('../authentificationController');


const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/creation-de-compte', authentificationController.getCreationDeCompte);

router.post('/creation-compte-reussi', authentificationController.postConnection);

router.get('/connexion', homeController.getConnexion);

router.get('/logout', authentificationController.getLogout);

router.post('/affichageProfil', authentificationController.postSignIn);

router.get('/profil', authentificationController.getProfil);

router.get('/profil/edit', authentificationController.getEditProfil);

router.put('/updateUser', authentificationController.updateUser);

router.get('/formulaireSpot', homeController.getFormulaireSpot);

router.post('/ProfilSpot', homeController.postProfilSpot);

router.get ('/feed', homeController.getFeed);

router.get ('/feed/:id', homeController.getSkiSpotById);

module.exports = router;