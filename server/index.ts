import express from 'express';
import { connectDatabase } from './database';
import { getUserCollection } from './database';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

const port = process.env.PORT || 3001;
const app = express();

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
app.get('*', (_request, response) => {
  response.sendFile(path.join(__dirname, '../dist/index.html'));
});

connectDatabase(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
