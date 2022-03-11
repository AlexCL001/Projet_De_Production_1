exports.getIndex = (req, res) => {
    res.render('index', {
        pageTitle: 'Accueil'
    });
}; 

exports.getConnexion = (req, res) => {
    res.render('connexion', {
        pageTitle: 'Connexion'
    });
}; 