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

router.post('/formulaireSpot', homeController.postNouveauSpot);

router.get('/feed/', homeController.getFeed);

router.get('/feed/:page', homeController.getFeed);

router.get('/feed/description/:id', homeController.getSkiSpotById);

router.get('/editSpot/:id', homeController.editSpot);

router.put('/updateSpot/:id', homeController.updateSpot);

router.delete('/deleteSpot/:id', homeController.deleteSpot);

router.get('/ami',homeController.getAmi );

module.exports = router;