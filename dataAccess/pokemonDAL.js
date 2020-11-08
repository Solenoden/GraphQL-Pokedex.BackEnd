const dbHelper = require('../common/dbHelper');
const DATABASE_COLLECTION = require('../enums/DatabaseCollection');

exports.getPokemon = () => {
    return dbHelper.getAll(DATABASE_COLLECTION.POKEMON, {}, {});
}

exports.getPokemonByName = (name) => {
    return dbHelper.get(DATABASE_COLLECTION.POKEMON, {name});
}

exports.getPokemonById = (id) => {
    return dbHelper.getById(DATABASE_COLLECTION.POKEMON, id);
}

exports.insertPokemon = (pokemon) => {
    return dbHelper.insert(DATABASE_COLLECTION.POKEMON, pokemon);
}

exports.updatePokemon = (id, pokemon) => {
    return dbHelper.updateById(DATABASE_COLLECTION.POKEMON, pokemon, id);
}