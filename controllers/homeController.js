const axios = require("axios");
const { response } = require("express");
const { token } = require("./authentificationController");
const express = require("express");
const { redirect } = require("express/lib/response");
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
  let totalSpots;

  const urlAllSpots = "https://ski-api.herokuapp.com/ski-spot";
  const url = `https://ski-api.herokuapp.com/ski-spot?limit=${SPOTS_PER_PAGE}&page=${page}`;
  
  let headers = {
    Authorization: accessToken,
    "Content-type": "application/json",
  };

  axios
    .get(urlAllSpots, {
      headers: headers,
    })
    .then((result) => {
      totalSpots = Object.keys(result.data.skiSpots).length;
      console.log('Total Spots', totalSpots);
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .get(url, {
      headers: headers,
    })
    .then((result) => {
      console.log('Total Spots', totalSpots);
      res.render("feed", {
        totalSpots: totalSpots,
        pageTitle: "Feed",
        data: result.data.skiSpots,
        currentPage: page,
        hasNextPage: SPOTS_PER_PAGE * page < totalSpots,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalSpots / SPOTS_PER_PAGE)
      });
    })
    .catch((error) => {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      res.redirect("/feed");
    });
};
