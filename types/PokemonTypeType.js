const {GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

exports.PokemonTypeType = new GraphQLObjectType({
    name: 'PokemonType',
    fields: () => ({
        name: {type: GraphQLString},
        weaknesses: {type: GraphQLList(GraphQLString)},
        strengths: {type: GraphQLList(GraphQLString)},
        color: {type: GraphQLString},
    })
});
