const {GraphQLList, GraphQLInt, GraphQLString} = require('graphql');
const pokemonDAL = require('../dataAccess/pokemonDAL');
const {PokemonType} = require('../types/PokemonType');
const Pokemon = require('../models/Pokemon');
const { PokemonTypeType } = require('../types/PokemonTypeType');

exports.register = (rootQueryConfig, rootMutationConfig) => {
    rootQueryConfig.fields.pokemonGetAll = pokemonGetAll;
    rootQueryConfig.fields.pokemonGetByName = pokemonGetByName;
    rootQueryConfig.fields.pokemonGetById = pokemonGetById;
    rootQueryConfig.fields.pokemonTypeGetAll = pokemonTypeGetAll;

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

const pokemonTypeGetAll = {
    type: new GraphQLList(PokemonTypeType),
    resolve(parent, args) {
        return pokemonDAL.getPokemonTypes();
    }
}

const pokemonCreate = {
    type: PokemonType,
    args: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        types: {type: GraphQLList(GraphQLString)},
        evolvesFromId: {type: GraphQLString},
        evolvesToIds: {type: GraphQLList(GraphQLInt)},
    },
    resolve(parent, args) {
        let pokemon = new Pokemon(args.id, args.name, args.types, args.evolvesFromId, args.evolvesToIds);
        return pokemonDAL.insertPokemon(pokemon);
    }
}

const pokemonUpdate = {
    type: PokemonType,
    args: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        types: {type: GraphQLList(GraphQLString)},
        evolvesFromId: {type: GraphQLString},
        evolvesToIds: {type: GraphQLList(GraphQLInt)},
    },
    resolve(parent, args) {
        const pokemon = new Pokemon(null, args.name, args.types, args.evolvesFromId, args.evolvesToIds);
        return pokemonDAL.updatePokemon(args.id, pokemon).then(result => {
            pokemon.id = args.id;
            return pokemon;
        });
    }
}
