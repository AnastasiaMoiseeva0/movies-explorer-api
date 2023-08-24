const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
require('dotenv').config();
const helmet = require('helmet');
const router = require('./routes/routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimit');

const { PORT = 3000, MONGO_URL } = process.env;

const app = express();

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

const allowedCors = [
  'http://localhost:3001',
  'https://amoiseeva.students.nomoreparties.ru',
  'http://amoiseeva.students.nomoreparties.ru',
];

app.use(requestLogger);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS';

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Origin', origin);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Origin', '*');
  }

  return next();
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.listen(PORT);
