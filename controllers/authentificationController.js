const axios = require('axios');
const express = require('express');
const app = express();

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
        // console.log(response);
        res.render('creationCompteReussi', {
            pageTitle: 'Connecter'
        });
    })
    .catch(err => {
        
        console.log(err.isAxiosError);
    });
};

exports.postSignIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if (!!email && !!password) {
        const body = JSON.stringify({
            email: email,
            password: password,
        });
        axios.post('https://ski-api.herokuapp.com/login', {
            'email': email,
            'password': password
        })
        .then(response => {
            // req.session.isAuth = true
console.log('response',response.data.token);
            res.app.locals.nomUtilisateur = response.data.name;
            res.app.locals.email = response.data.email;
            res.app.locals.token = response.data.token;
            let token = response.data.token;
            // module.exports = token
            console.log('app.locals.token', res.app.locals.token);
            res.render('profil', {
                pageTitle: 'Profil',
                nomUtilisateur: res.app.locals.nomUtilisateur,
                email: res.app.locals.email,
                token: res.app.locals.token
            })
        })
        .catch(error => {
            res.send(error);
            
        });
    }
};

exports.getProfil = (req, res) => {
    res.render('profil', {
        pageTitle: 'Profil'
    });
};

exports.getEditProfil = (req, res) => {
    res.render('editProfil', {
        pageTitle: 'Changer Profil'
    });
};


