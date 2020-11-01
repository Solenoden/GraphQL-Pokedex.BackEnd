const {GraphQLList, GraphQLInt, GraphQLString} = require('graphql');
const {pokemon} = require('../data/pokemonData');
const {PokemonType} = require('../types/PokemonType');
const Pokemon = require('../models/Pokemon');

exports.register = (rootQueryConfig, rootMutationConfig) => {
    rootQueryConfig.fields.pokemonGetAll = pokemonGetAll;
    rootQueryConfig.fields.pokemonGetById = pokemonGetById;

    rootMutationConfig.fields.pokemonCreate = pokemonCreate;
    rootMutationConfig.fields.pokemonUpdate = pokemonUpdate;
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

const pokemonCreate = {
    type: PokemonType,
    args: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        type: {type: GraphQLString}
    },
    resolve(parent, args) {
        let newPokemon = new Pokemon(args.id, args.name, args.type);
        pokemon.push(newPokemon);

        return newPokemon;
    }
}

const pokemonUpdate = {
    type: PokemonType,
    args: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        type: {type: GraphQLString}
    },
    resolve(parent, args) {
        let pokemonToUpdate = pokemon.find(currentPokemon => currentPokemon.id === args.id);
        pokemonToUpdate.name = args.name;
        pokemonToUpdate.type = args.type;

        return pokemonToUpdate;
    }
}
