const {GraphQLObjectType, GraphQLSchema} = require('graphql');

let rootQueryConfig = {
    name: 'RootQueryType',
    fields: {}
};
require('./resolvers/pokemonResolver').register(rootQueryConfig);
const rootQuery = new GraphQLObjectType(rootQueryConfig);

module.exports = new GraphQLSchema({
    query: rootQuery
})
