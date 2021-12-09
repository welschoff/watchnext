import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './database';
import { getUserCollection } from './database';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cookieParser());

// PATCH a new series to a user
app.patch('/api/users/:username', async (request, response) => {
  const userCollection = getUserCollection();
  const username = request.params.username;
  const newSeries = request.body;
  await userCollection.updateOne(
    { username: username },
    { $addToSet: { watchlist: newSeries } }
  ),
    response.send('Updated');
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

// const token = jwt.sign(username, JWT_SECRET)

// GET logged User

app.get('/api/me', async (request, response) => {
  const username = request.cookies.username;
  const usersCollection = getUserCollection();
  const loggedUser = await usersCollection.findOne({
    username: username,
  });

  if (loggedUser) {
    response.send(loggedUser);
  } else {
    response.status(404).send('User not found');
  }
});

app.get('/api/users/:username', async (request, response) => {
  const username = request.params.username;
  const usersCollection = getUserCollection();
  const user = await usersCollection.findOne({
    username: username,
  });

  if (user) {
    response.send(user);
  } else {
    response.status(404).send('User not found');
  }
});
