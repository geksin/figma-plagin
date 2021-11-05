const express = require('express');
const process = require('process');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
require('dotenv').config();
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);


app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});


app.listen(process.env.PORT, () => {
    console.log(`Сервер запущен, порт ${process.env.PORT}`);
  });