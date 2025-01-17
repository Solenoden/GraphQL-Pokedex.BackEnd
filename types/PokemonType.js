const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

exports.PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        types: {type: GraphQLList(GraphQLString)},
        evolvesFromId: {type: GraphQLString},
        evolvesToId: {type: GraphQLString}
    })
});
