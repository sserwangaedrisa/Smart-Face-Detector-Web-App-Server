const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const clarifai = require('clarifai');

const RegisterHandler = require('./controllers/RegisterHandler');
const signInHandler = require('./controllers/signInHandler');
const profileHandler = require('./controllers/profileHandler');
const imageHandler = require('./controllers/imageHandler');
const apiCallHandler = require('./controllers/apiCallHandler');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: '143sserwanga',
    database: 'Brain',
  },
});

app.get('/', (req, res) => {
  res.json('THERE WE GO ');
});

app.post('/signin', (req, res) => {
  signInHandler.signInHandler(req, res, db, bcrypt);
});

app.post('/signup', (req, res) => {
  RegisterHandler.RegisterHandler(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
  profileHandler.profileHandler(req, res);
});

app.put('/image', (req, res) => {
  imageHandler.imageHandler(req, res, db);
});
app.post('/api', (req, res) => {
  const raw = JSON.stringify({
    inputs: [
      {
        data: {
          image: {
            url: req.body.input,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 7dd352e7546e4369812f85f7503a5b26',
    },
    body: raw,
  };

  fetch(
    `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error('Error calling Clarifai API:', error);
      res
        .status(500)
        .json({ error: 'An error occurred during Clarifai API call' });
    });
});

app.listen(3000);
