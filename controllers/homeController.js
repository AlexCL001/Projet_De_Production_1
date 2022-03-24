exports.getIndex = (req, res) => {
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

exports.getProfilSpot = (req, res) => {
    res.render('profilSpot', {
        pageTitle: 'Profil Spot'
    })
}