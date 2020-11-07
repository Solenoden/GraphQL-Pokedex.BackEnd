const dbHelper = require('../common/dbHelper');
const DATABASE_COLLECTION = require('../enums/DatabaseCollection');

exports.getPokemon = () => {
    return dbHelper.getAll(DATABASE_COLLECTION.POKEMON, {}, {}, 2);
}

exports.getPokemonByName = (name) => {
    return dbHelper.get(DATABASE_COLLECTION.POKEMON, {name});
}
