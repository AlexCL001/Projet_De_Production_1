const axios = require("axios");
const { response } = require("express");
const { token } = require("./authentificationController");
const express = require("express");
const { redirect, type } = require("express/lib/response");
const app = express();
const SPOTS_PER_PAGE = 2;

exports.getIndex = (req, res) => {
  res.render("connexion", {
    pageTitle: "Connexion",
  });
};

exports.getConnexion = (req, res) => {
  res.render("connexion", {
    pageTitle: "Connexion",
  });
};

exports.getFormulaireSpot = (req, res) => {
  let accessToken = req.app.locals.token;
  
  res.render("formulaireSpot", {
    pageTitle: "Formulaire spot",
    accessToken: accessToken,
  });
};

exports.getFeed = (req, res) => {
  const accessToken = req.app.locals.token;
  let page = parseInt(req.query.page);

  const url = `https://ski-api.herokuapp.com/ski-spot?limit=${SPOTS_PER_PAGE}&page=${page}`;
  
  let headers = {
    Authorization: accessToken,
    "Content-type": "application/json",
  };

  axios.get(url, {
    headers: headers,
  })
  .then((result) => {
    res.render("feed", {
      totalSpots: result.data.totalPages,
      pageTitle: "Feed",
      data: result.data.skiSpots,
    });
  })
  .catch((error) => {
    res.redirect("/feed");
  });
};

exports.getSkiSpotById = (req, res) => {
  let id = req.params.id;
  let accessToken = req.app.locals.token;

  axios({
    method: "get",
    url: `http://ski-api.herokuapp.com/ski-spot/${id}`,
    headers: {
      Authorization: accessToken,
    },
  })
    .then((result) => {
      res.render("feedDescription", {
        pageTitle: "Feed Description",
        name: result.data.skiSpot.name,
        address: result.data.skiSpot.address,
        description: result.data.skiSpot.description,
        difficulty: result.data.skiSpot.difficulty,
      });
    })
    .catch((error) => {
      res.redirect("feed");
    });
};

exports.postNouveauSpot = (req, res) => {
  let name = req.body.nomDuSpot;
  let description = req.body.description;
  let address = req.body.address;
  let difficulty = req.body.nivDiff;
  let coordinates = Array.from(req.body.coordinates.split(","));
  let accessToken = req.app.locals.token;

  const url = "https://ski-api.herokuapp.com/ski-spot";
  let data = {
    name: name,
    description: description,
    address: address,
    difficulty: difficulty,
    coordinates: coordinates,
  };

  let headers = {
    Authorization: accessToken,
  };

  axios
    .post(url, data, {
      headers: headers,
    })
    .then((result) => {
      res.redirect("/formulaireSpot");
    })
    .catch((error) => {
      res.redirect("/formulaireSpot");
    });
};

exports.editSpot = (req, res) => {
  let accessToken = req.app.locals.token;
  let spotId = req.params.id;

  const url = `http://ski-api.herokuapp.com/ski-spot/${spotId}`;

  let headers = {
    Authorization: accessToken,
    "Content-type": "application/json",
  };

  axios
    .get(url, {
      headers: headers,
    })
    .then((result) => {
      res.render("editSpot", {
        pageTitle: "Edit Spot",
        id: spotId,
        name: result.data.skiSpot.name,
        description: result.data.skiSpot.description,
        address: result.data.skiSpot.address,
        difficulty: result.data.skiSpot.difficulty,
      });
    })
    .catch((error) => {
      res.redirect("/profil");
    });
};

exports.updateSpot = (req, res) => {
  let accessToken = req.app.locals.token;
  let spotId = req.params.id;
  let name = req.body.name;
  let description = req.body.description;
  let address = req.body.address;
  let difficulty = req.body.difficulty;

  const url = `http://ski-api.herokuapp.com/ski-spot/${spotId}`;
  let data = {
    name: name,
    description: description,
    address: address,
    difficulty: difficulty,
  };
  let headers = {
    Authorization: accessToken,
    "Content-type": "application/json",
  };

  axios
    .put(url, data, {
      headers: headers,
    })
    .then((result) => {
      res.redirect("/feed");
    })
    .catch((error) => {
      res.redirect("/feed");
    });
};

exports.deleteSpot = (req, res) => {
  let accessToken = req.app.locals.token;
  let spotId = req.params.id;
  const url = `http://ski-api.herokuapp.com/ski-spot/${spotId}`;

  let headers = {
    Authorization: accessToken,
    "Content-type": "application/json",
  };

  axios
    .delete(url, {
      headers: headers,
    })
    .then((result) => {
      res.redirect("/feed");
    })
    .catch((error) => {
      res.redirect("/feed");
    });
};

exports.getAmi = (req , res)=>{
  res.render("ami", {pageTitle: "Ami", users: undefined});
}; 

exports.getRechercheAmi = (req, res)=>{
  let rechercheAmi = req.query.rechercheAmi;
  let accessToken = req.app.locals.token;

  axios({
    method: "get",
    url: `http://ski-api.herokuapp.com/friend`,
    headers: {
      Authorization: accessToken,
    },
  })
  .then((result)=>{
    friendsCompare = result.data.friends;
  })
  .catch((error)=>{
    res.redirect('/ami');
  });
  
  axios({
    method: "get",
    url: `http://ski-api.herokuapp.com/users/search/${rechercheAmi}`,
    headers: {
      Authorization: accessToken,
    },
  })
  .then((result)=>{
    res.render('ami', {
      users: result.data.users,
      pageTitle: "Ami"
    });
  })
  .catch((error)=>{
    res.redirect('/ami');
  });

}

exports.getAmiProfil = (req, res)=>{
  let accessToken = req.app.locals.token;
  let id = req.params.id;

  axios({
    method: "get",
    url: `http://ski-api.herokuapp.com/friend`,
    headers: {
      Authorization: accessToken,
    },
  })
  .then((result)=>{
    friendsCompare = result.data.friends;
  })
  .catch((error)=>{
    res.redirect('/ami');
  });
  
  axios({
    method: "get",
    url: `http://ski-api.herokuapp.com/user/${id}`,
    headers: {
      Authorization: accessToken,
    },
  })
  .then((result)=>{
    res.render('profil', {
      pageTitle: "Profil ami",
      nomUtilisateur: result.data.user.name,
      email: result.data.user.email,
      address: result.data.user.address,
      phone: result.data.user.phone,
      friends: result.data.user.friends,
      id: result.data.user.id,
      myProfile: false,
    })
  })
  .catch((error)=>{
    res.redirect('/ami');
  });

}

exports.ajouterAmi = (req, res)=>{
  let accessToken = req.app.locals.token;
  id = req.params.id;

  axios({
    method: "post",
    url: `http://ski-api.herokuapp.com/friend`,
    data: {
      friendId: id,
    },
    headers: {
      Authorization: accessToken,
    },
  })
  .then((result)=>{
    res.redirect(`/rechercheAmi`);
  })
  .catch((error)=>{
    res.redirect('/rechercheAmi');
  });
}

exports.supprimerAmi = (req, res)=>{  
  let accessToken = req.app.locals.token;
  let id = req.params.id;

  axios({
    method: "delete",
    url: `http://ski-api.herokuapp.com/friend/${id}`,
    headers: {
      Authorization: accessToken,
    },
  })
  .then((result)=>{
    res.redirect('/profil');
  })
  .catch((error)=>{
    res.redirect('/profil');
  });
}