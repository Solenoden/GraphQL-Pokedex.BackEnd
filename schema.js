const {GraphQLObjectType, GraphQLSchema} = require('graphql');

let rootQueryConfig = {
    name: 'RootQueryType',
    fields: {}
};
let rootMutationConfig = {
    name: 'RootMutationType',
    fields: {}
};

require('./resolvers/pokemonResolver').register(rootQueryConfig, rootMutationConfig);

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType(rootQueryConfig),
    mutation: new GraphQLObjectType(rootMutationConfig)
});
