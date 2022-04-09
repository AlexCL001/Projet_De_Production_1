const axios = require("axios");
const { response } = require("express");
const { token } = require("./authentificationController");
const express = require("express");
const app = express();

exports.getIndex = (req, res) => {
  // console.log(res.app.locals)
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
  res.render("formulaireSpot", {
    pageTitle: "Formulaire spot",
  });
};

exports.postProfilSpot = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const address = req.body.address;
  const difficulty = req.body.difficulty;
  const coordinates = req.body.coordinates;

  axios
    .post(
      "https://ski-api.herokuapp.com/ski-spot",
      {
        name: "Vallée des fantômes",
        description: "Un méchant beau spot",
        address: "12345 Monts Valins, Saguenay, Québec",
        difficulty: "facile",
        coordinates: [123, 456],
      },
      {
        headers: {
          Authorization: req.app.locals.token,
        },
      }
    )
    .then((response) => console.log(response.data));

  console.log(token, "token");
  res.render("profilSpot", {
    pageTitle: "Profil spot",
  });
};

exports.getFeed = (req, res) => {
  let accessToken = req.app.locals.token;
  let spotsParPage = req.body.pagination;
  console.log(spotsParPage);
  // get number of spots per page and pass to params
  axios({
    method: "get",
    url: "http://ski-api.herokuapp.com/ski-spot",
    // params: {limit: 2,
    //         page: 2
    // },
    headers: {
      'Authorization': accessToken,
    },
  })
    .then((result) => {  
      console.log(result.data.skiSpots);
      res.render("feed", {
        pageTitle: "Feed",
        data: result.data.skiSpots,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.getSkiSpotById = (req,res) =>{
  let id=req.params.id;
  let accessToken = req.app.locals.token;
  axios({
    method: 'get',
    url:`http://ski-api.herokuapp.com/ski-spot/${id}`,
    headers:{
      'Authorization': accessToken
    }
    
    
  })
  .then(result =>{
    console.log( result.data.skiSpot)
    res.render("feedDescription",{
      pageTitle: "Feed Description",
      name: result.data.skiSpot.name,
      address: result.data.skiSpot.address,
      description: result.data.skiSpot.description,
      difficulty: result.data.skiSpot.difficulty,
    });
  })
  .catch(error =>{
    console.log(error);
    res.redirect('feed');
  });
};