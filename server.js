// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const usersRouter = require('./routes/users');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API routes
app.use('/users', usersRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
