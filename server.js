const express = require('express');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const app = express();

const siteRoutes = require('./routes/siteRoutes');

dotenv.config({ path: './.env', });
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('layout', './layouts/mainLayout.ejs');

app.use(bodyParser.urlencoded({ extended:false }));
app.use(expressLayouts);
app.use(siteRoutes);

app.listen(port);



