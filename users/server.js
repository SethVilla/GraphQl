const express = require('express');
// middleware functions modify requests
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

// if any request comes for /graphql be handled by graphql library
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // development tool to make queries against development server
  })
);

app.listen(4000, () => {
  console.log('listening on port 4000');
});
