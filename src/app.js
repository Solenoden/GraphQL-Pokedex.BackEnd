const {GraphQLServer} = require('graphql-yoga');

const resolvers = {};

const app = new GraphQLServer({
   typeDefs: './schema.graphql',
   resolvers
});
app.start(() => console.log('App running and listening on port 4000'));
