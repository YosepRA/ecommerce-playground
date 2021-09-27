require('dotenv').config();

const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');

const indexRouter = require('./routes/index.js');

const jsonRouter = jsonServer.router('./data/db.json');

const app = express();
const port = process.env.PORT || 3000;
const corsConfig =
  process.env.NODE_ENV === 'development'
    ? { origin: 'http://localhost:8000' }
    : { origin: false };

/* ========== Middlewares ========== */

app.use(cors(corsConfig));

/* ========== Routes ========== */

app.use('/', indexRouter);
app.use('/json', jsonRouter);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} ...`);
});
