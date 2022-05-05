const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql')
const cors = require('cors')

const schema = require('./services/schema.js').schema;

const app = express();

app.use(cors({origin: '*'}))

app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);