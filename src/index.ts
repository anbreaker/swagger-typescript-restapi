const { app } = require('./app');

import { createConnection } from './database/db';
require('dotenv').config();

createConnection();

const port = process.env.PORT || 4000;

// <-- Server listenning -->
const server = app.listen(port, () => {
  console.log(`Listening server on Port -> http://localhost:${server.address().port}`);
});
