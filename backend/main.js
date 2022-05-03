const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql')

const schema = require('./services/schema.js').schema;

const app = express();

app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);