const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './.env', });
const port = process.env.PORT || 3000;

app.listen(port);



