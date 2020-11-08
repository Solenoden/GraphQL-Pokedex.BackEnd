const {GraphQLList, GraphQLInt, GraphQLString} = require('graphql');
const pokemonDAL = require('../dataAccess/pokemonDAL');
const {PokemonType} = require('../types/PokemonType');
const Pokemon = require('../models/Pokemon');

exports.register = (rootQueryConfig, rootMutationConfig) => {
    rootQueryConfig.fields.pokemonGetAll = pokemonGetAll;
    rootQueryConfig.fields.pokemonGetByName = pokemonGetByName;
    rootQueryConfig.fields.pokemonGetById = pokemonGetById;

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

const pokemonGetById = {
    type: PokemonType,
    args: {
        id: {type: GraphQLInt}
    },
    resolve(parent, args) {
        return pokemonDAL.getPokemonById(args.id);
    }
}

const pokemonCreate = {
    type: PokemonType,
    args: {
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        evolvesFromId: {type: GraphQLString},
        evolvesToId: {type: GraphQLString},
    },
    resolve(parent, args) {
        let pokemon = new Pokemon(null, args.name, args.type, args.evolvesFromId, args.evolvesToId);
        return pokemonDAL.insertPokemon(pokemon);
    }
}

const pokemonUpdate = {
    type: PokemonType,
    args: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        evolvesFromId: {type: GraphQLString},
        evolvesToId: {type: GraphQLString},
    },
    resolve(parent, args) {
        const pokemon = new Pokemon(null, args.name, args.type, args.evolvesFromId, args.evolvesToId);
        return pokemonDAL.updatePokemon(args.id, pokemon).then(result => {
            pokemon.id = args.id;
            return pokemon;
        });
    }
}
