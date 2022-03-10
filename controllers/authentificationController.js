const axios = require('axios');

exports.getCreationDeCompte = (req, res) => {
    res.render('creationDeCompte', {
        pageTitle: 'Crée une Compte'
    });
};

exports.postConnection = (req, res) => {
    const name = req.body.nom;
    const email = req.body.email;
    const password = req.body.motDePasse;
    
    axios.post('https://ski-api.herokuapp.com/signup', {
       "name": name,
       "email": email,
        "password": password
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });

    res.render('connexion', {
        pageTitle: 'Connecter'
    });
};