const path = require('path');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const PORT = 3000;

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.listen(PORT, () => {
  console.log(`Server running on - http://localhost:${PORT}`);
});
