require('dotenv').config();

const express = require('express');
const jsonServer = require('json-server');

const indexRouter = require('./routes/index.js');

const jsonRouter = jsonServer.router('./data/db.json');

const app = express();
const port = process.env.PORT || 3000;

/* ========== Routes ========== */

app.use('/', indexRouter);
app.use('/json', jsonRouter);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} ...`);
});
