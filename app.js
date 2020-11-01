const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');

const app = express();
app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}));

const port = process.env.PORT || 3000;
app.listen(port);
console.log('processId:' + process.pid + ' APP.JS running and listening on port ' + port + '...');
