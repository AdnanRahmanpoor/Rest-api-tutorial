// Import needed packages/libraries
require('dotenv').config();
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

// init express app
const app = express();

// use cors
app.use(
  cors({
    credentials: true,
  }),
);

// Use packages needed in the app
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// create server
const server = http.createServer(app);

// take server live on localhost:8080
server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

// MONGODB Connection (from .env for security)
const MONGO_URL = process.env.MONGO_URI;

// Init mongoose with Promise
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
