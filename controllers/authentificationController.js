exports.getCreationDeCompte = (req, res) => {
    res.render('creationDeCompte', {
        pageTitle: 'Crée une Compte'
    });
};

exports.getConnection = (req, res) => {
    res.render('connection', {
        pageTitle: 'Connecter'
    });
};