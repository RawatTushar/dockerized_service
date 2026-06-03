require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Duniyaaa');
});

app.get('/secret', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Secret Area"');
    return res.status(401).send('Authentication required');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [username, password] = credentials.split(':');

  if (
    username === process.env.USERNAME &&
    password === process.env.PASSWORD
  ) {
    return res.send(process.env.SECRET_MESSAGE);
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Secret Area"');
  res.status(401).send('Invalid credentials');
});

const port = process.env.PORT 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});