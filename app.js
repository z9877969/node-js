const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const { authorize } = require('./middlewares/authorize');
const { imitateRequest } = require('./middlewares');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
// const formatsLogger = "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(imitateRequest(500));

app.use('/api/auth', usersRouter);
app.use('/api/todo', authorize, contactsRouter);
app.use('/api/ping', (req, res, next) => {
  try {
    res.json('iam ok');
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { message = 'Server fall out', status = 500 } = err;
  res.status(status).json({ message });
});

module.exports = app;
