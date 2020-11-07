const {GraphQLObjectType, GraphQLString} = require('graphql');

exports.PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        type: {type: GraphQLString}
    })
});
