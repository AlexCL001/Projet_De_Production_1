const axios = require("axios");
const express = require("express");
const app = express();

exports.getCreationDeCompte = (req, res) => {
  res.render("creationDeCompte", {
    pageTitle: "Crée une Compte",
  });
};

exports.postConnection = (req, res) => {
  const name = req.body.nom;
  const email = req.body.email;
  const password = req.body.motDePasse;

  axios
    .post("https://ski-api.herokuapp.com/signup", {
      name: name,
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      res.render("creationCompteReussi", {
        pageTitle: "Connecter",
      });
    })
    .catch((err) => {
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
    axios
      .post("https://ski-api.herokuapp.com/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        // req.session.isAuth = true

        res.app.locals.nomUtilisateur = response.data.name;
        res.app.locals.email = response.data.email;
        res.app.locals.token = response.data.token;
        res.app.locals.address = response.data.address;
        res.app.locals.phone = response.data.phone;

        res.render("profil", {
          pageTitle: "Profil",
          nomUtilisateur: res.app.locals.nomUtilisateur,
          email: res.app.locals.email,
          token: res.app.locals.token,
          address: res.app.locals.address,
          phone: res.app.locals.phone,
        });
      })
      .catch((error) => {
        res.send(error);
      });
  }
};

exports.getProfil = (req, res) => {
  res.render("profil", {
    pageTitle: "Profil",
    nomUtilisateur: req.app.locals.nomUtilisateur,
    email: req.app.locals.email,
    address: req.app.locals.address,
    phone: req.app.locals.phone,
  });
};

exports.getEditProfil = (req, res) => {
  res.render("editProfil", {
    pageTitle: "Changer Profil",
    nomUtilisateur: req.app.locals.nomUtilisateur,
    email: req.app.locals.email,
    address: req.app.locals.address,
    phone: req.app.locals.phone,
  });
};

exports.getLogout = (req, res) => {
  res.app.locals = {};
  res.redirect("/connexion");
};

exports.updateUser = (req, res) => {
  let accessToken = req.app.locals.token;
  let nomUtilisateur = req.body.nomUtilisateur;
  let email = req.body.email.trim();
  let address = req.body.address;
  let phone = req.body.phone;

  const url = "https://ski-api.herokuapp.com/user";
  let data = {
    name: nomUtilisateur,
    email: email,
    address: address,
    phone: phone
  };
  let headers = {
    'Authorization': accessToken,
    "Content-type": "application/json",
  };

  axios
    .put(url, data, {
      headers: headers,
    })
    .then((result) => {
      console.log("UPDATE RESULTS:", result);
      res.app.locals.nomUtilisateur = result.data.user.name;
      res.app.locals.email = result.data.user.email;
      res.app.locals.token = result.data.user.token;
      res.app.locals.address = result.data.user.address;
      res.app.locals.phone = result.data.user.phone;

      res.render("profil", {
        pageTitle: "Profil",
        nomUtilisateur: req.app.locals.nomUtilisateur,
        email: req.app.locals.email,
        address: req.app.locals.address,
        phone: req.app.locals.phone,
      });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/profil");
    });
};

