const {GraphQLObjectType, GraphQLInt, GraphQLString} = require('graphql');

exports.PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        type: {type: GraphQLString}
    })
});
