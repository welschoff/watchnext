import express from 'express';
import { connectDatabase } from './database';
import { getUserCollection } from './database';
import dotenv from 'dotenv';
dotenv.config();
// import path from 'path';
import fetch from 'node-fetch';
import cors from 'cors';

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

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
app.get('/api/users/', async (_request, response) => {
  const usersCollection = getUserCollection();
  const user = usersCollection.find();
  const allUsers = await user.toArray();
  response.send(allUsers);
});

// LOGIN A USER
app.get('/api/users/:username/:password', async (req, res) => {
  const userCollection = getUserCollection();
  const username = req.params.username;
  const password = req.params.password;
  const isUserKnown = await userCollection.findOne({
    username: username,
    password: password,
  });
  if (isUserKnown) {
    res.send('Welcome');
  } else {
    res.send('Login failed');
  }
  console.log(isUserKnown);
});

app.get('/api/hello', (_request, response) => {
  response.json({ message: 'Hello from server' });
});

// Serve production bundle
app.use(express.static('dist'));

// Handle client routing, return all requests to the app
// app.get('*', (_request, response) => {
//   response.sendFile(path.join(__dirname, '../dist/index.html'));
// });

connectDatabase(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);

app.post('/api/login', async (request, response) => {
  const { username, password } = request.body;

  const userCollection = getUserCollection();

  const existingUser = await userCollection.findOne({ username, password });
  if (existingUser) {
    response.setHeader('Set-Cookie', `username=${username}`);
    response.send('Login successful');
    return;
  } else {
    response
      .status(401)
      .send('Login failed. Check if username and password is correct');
  }
});
