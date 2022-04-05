const axios = require('axios');
const { response } = require('express');
const { token } = require('./authentificationController');

exports.getIndex = (req, res) => {
    // console.log(res.app.locals)
    res.render('connexion', {
        pageTitle: 'Connexion'
    });
}; 

exports.getConnexion = (req, res) => {
    res.render('connexion', {
        pageTitle: 'Connexion'
    });
}; 

exports.getFormulaireSpot = (req, res) => {
    res.render('formulaireSpot', {
        pageTitle: 'Formulaire spot'
    });
};

exports.postProfilSpot = (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const address = req.body.address
    const difficulty = req.body.difficulty
    const coordinates = req.body.coordinates

    axios.post('https://ski-api.herokuapp.com/ski-spot', {
        "name": "Vallée des fantômes",
        "description": "Un méchant beau spot",
        "address": "12345 Monts Valins, Saguenay, Québec",
        "difficulty": "facile",
        "coordinates": [123, 456]
    },
    {
        headers: {'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MjJhNDBiYjQ4YTc5ZTAwMDQwYzk4OWEiLCJleHAiOjE2NDgzMTc2MzU2NTJ9.UlGQ1PDGywM_Lf3C92xZZJioqMuSxjdprSpe3_Pjra8'
    }}
    )
    .then(response => console.log(response.data))

    console.log(token, 'token')
    res.render('profilSpot', {
        pageTitle: 'Profil spot',
    })
}

exports.getFeed = (req, res) => {
    res.render('feed', {
        pageTitle: 'Feed'
    })
}
