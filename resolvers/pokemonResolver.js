const {GraphQLList, GraphQLInt, GraphQLString} = require('graphql');
const pokemonDAL = require('../dataAccess/pokemonDAL');
const {pokemon} = require('../data/pokemonData');
const {PokemonType} = require('../types/PokemonType');
const Pokemon = require('../models/Pokemon');

exports.register = (rootQueryConfig, rootMutationConfig) => {
    rootQueryConfig.fields.pokemonGetAll = pokemonGetAll;
    rootQueryConfig.fields.pokemonGetByName = pokemonGetByName;

    rootMutationConfig.fields.pokemonCreate = pokemonCreate;
    rootMutationConfig.fields.pokemonUpdate = pokemonUpdate;
};

const pokemonGetAll = {
    type: new GraphQLList(PokemonType),
    resolve(parent, args) {
        return pokemonDAL.getPokemon();
    }
}

const pokemonGetByName = {
    type: PokemonType,
    args: {
        name: {type: GraphQLString}
    },
    resolve(parent, args) {
        return pokemonDAL.getPokemonByName(args.name);
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
