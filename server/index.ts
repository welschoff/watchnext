import express from 'express';
import { connectDatabase } from './database';
import { getUserCollection } from './database';
import { getWatchlistCollection } from './database';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());

// ADD series to watchlist
app.post('/api/watchlist', async (request, response) => {
  const watchlistCollection = getWatchlistCollection();
  const newSeries = request.body;

  if (typeof newSeries.name !== 'string') {
    response.status(404).send('Missing properties');
  }
  const isSeriesKnown = await watchlistCollection.findOne({
    name: newSeries.name,
  });
  if (isSeriesKnown) {
    response
      .status(409)
      .send(`There is already a series called ${newSeries.name}`);
  } else {
    watchlistCollection.insertOne(newSeries);
    response.send(`${newSeries.name} was added`);
  }
});

// GET Details
app.get('/api/detail/:id', async (req, res) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await response.json();
  res.send(data);
});

// GET Popular Series
app.get('/api/popular', async (_req, res) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&page=`
  );
  const data = await response.json();
  console.log(data);
  res.send(data);
});

// SEARCH series
app.get('/api/search/:name', async (req, res) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${req.params.name}`
  );
  const data = await response.json();
  console.log(data);
  res.send(data);
});

if (!process.env.MONGODB_URI) {
  throw new Error('No MongoDB URI dotenv variable');
}

// GET all users
app.get('/api/users', async (_request, response) => {
  const usersCollection = getUserCollection();
  const cursor = usersCollection.find();
  const allUsers = await cursor.toArray();
  response.send(allUsers);
});

app.get('/api/hello', (_request, response) => {
  response.json({ message: 'Hello from server' });
});

// Serve production bundle
app.use(express.static('dist'));

connectDatabase(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);

//LOGIN a user
app.post('/api/login', async (request, response) => {
  const { username, password } = request.body;

  const userCollection = getUserCollection();

  const existingUser = await userCollection.findOne({ username, password });
  if (existingUser) {
    response.setHeader('Set-Cookie', `username=${username}`);
    response.send(existingUser);
  } else {
    response
      .status(401)
      .send('Login failed. Check if username and password is correct');
  }
});
