import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { checkIfAuthenticated } from './middlewares/authMiddleware';
import { createUser } from './auth/userService';

const app = express();
const port = process.env.APP_PORT;

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/auth/signup', createUser);

app.get('/riffs', checkIfAuthenticated, async (_, res) => {
  res.send('Authenticated!');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
