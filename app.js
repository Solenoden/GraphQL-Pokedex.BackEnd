const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');

const app = express();

const cors = require('cors');
app.use(cors());

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}));

console.log('processId:' + process.pid + ' Connecting to database');
const dbHelper = require('./common/dbHelper');
dbHelper.connectToDatabase(app).catch(error => {
   console.error('processId:' + process.pid + ' Failed to connect to database: ' + error);
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log('processId:' + process.pid + ' APP.JS running and listening on port ' + port + '...');
