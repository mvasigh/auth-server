const config = require('./config');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// Database Setup
const mongoUri = process.env.MONGO_URI || config.mongoUri;
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true },
  () => console.log('Connected to database')
);

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on ${port}`);
