const express = require('express');
const cors = require('cors');

const port = require('../src/config/port');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, console.log(`Listening to port ${port}`))