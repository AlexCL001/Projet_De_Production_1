const express = require('express');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');

const app = express();

const siteRoutes = require('./controllers/routes/siteRoutes');

dotenv.config({ path: './.env', });
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('layout', './layouts/mainLayout.ejs');

app.use(methodOverride('_method'));

app.use(expressSession({
    cookie: {
        maxAge: 4000000
    },
    secret: 'secretKeyToMoveInDotEnv',
    saveUninitialized: false,
    resave: false
}));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(expressLayouts);
app.use(siteRoutes);
app.use(express.static('public'));

app.listen(port,()=>{
 console.log(`Votre serveur démarre sur le port ${port}`);
});
