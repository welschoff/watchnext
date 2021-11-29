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
app.use(
  cors({
    origin: '*',
  })
);

app.get('/api/popular', async (_req, res) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&page=1`
  );
  const data = await response.json();
  console.log(data);
  res.send(data);
});

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
  const currywurst = usersCollection.find();
  const allUsers = await currywurst.toArray();
  response.send(allUsers);
});

type UserProps = {
  username: string;
  password: string;
};

// LOGIN a user
app.post('/api/login', (request, response) => {
  const usersCollection = getUserCollection();
  const loginUser = request.body;

  const isUserKnown = usersCollection.find(
    ({ username, password }: UserProps) => {
      username === loginUser.username && password === loginUser.password;
    }
  );
  if (isUserKnown) {
    response.status(200).send(`You are now logged in`);
  } else {
    response.send(`Wrong username or password`);
  }
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
