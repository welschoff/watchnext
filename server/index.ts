import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './database';
import { getUserCollection } from './database';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
// import jwt from 'jsonwebtoken';

// const { JWT_SECRET } = process.env;

// if (!JWT_SECRET) {
//   throw new Error('No JWT_SECRET provided');
// }

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

// GET watchlist
app.get('/api/watchlist/:username', async (request, response) => {
  const usersCollection = getUserCollection();
  const username = request.cookies;
  const watchlist = await usersCollection.findOne({ username: username });
  response.send(watchlist);
});

// DELETE a series from watchlist
app.put('/api/users/:username', (request, response) => {
  const userCollection = getUserCollection();
  const username = request.params.username;
  const deleteSeries = request.body;
  userCollection.updateOne(
    { username: username },
    { $pull: { watchlist: deleteSeries } }
  );
  response.send('deleted');
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
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&page=1`
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
  const userCollection = getUserCollection();
  const cursor = userCollection.find();
  const allUsers = await cursor.toArray();
  response.send(allUsers);
});

// GET users without logged User
app.get('/api/friends/:username', async (request, response) => {
  const usersCollection = getUserCollection();
  const username = request.params.username;
  const cursor = usersCollection.find({
    username: { $ne: username },
  });
  const friends = await cursor.toArray();
  response.send(friends);
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
    response.setHeader('User', `username=${username}`);
    response.send(existingUser);
  } else {
    response
      .status(401)
      .send('Login failed. Check if username and password is correct');
  }
});

// LOGOUT
app.get('/api/logout', async (request, response) => {
  const username = request.cookies;
  try {
    response
      .clearCookie('User', '')
      .send(`${username.username} was logged out`);
    await request.cookies.save();
  } catch (error) {
    response.send(error);
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

// GET specific user
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

app.get('*', (_request, response) => {
  response.sendFile(path.join(__dirname, '../dist/index.html'));
});
