const {GraphQLList, GraphQLInt} = require('graphql');
const {pokemon} = require('../data/pokemonData');
const {PokemonType} = require('../types/PokemonType');

exports.register = (rootQueryConfig) => {
    rootQueryConfig.fields.pokemonGetAll = pokemonGetAll;
    rootQueryConfig.fields.pokemonGetById = pokemonGetById;
};

const pokemonGetAll = {
    type: new GraphQLList(PokemonType),
    resolve(parent, args) {
        return pokemon;
    }
}

const pokemonGetById = {
    type: PokemonType,
    args: {
      id: {type: GraphQLInt}
    },
    resolve(parent, args) {
        return pokemon.find(currentPokemon => currentPokemon.id === args.id);
    }
}
