const express = require('express');
const models = require('./models');
const { graphqlHTTP: expressGraphQL } = require(`express-graphql`);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@graphql-demo.e2ifus6.mongodb.net/?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
