const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://tapishpawar:abcd@cluster0.wh29qcp.mongodb.net/test';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

module.exports = db;
