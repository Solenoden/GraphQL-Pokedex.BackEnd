const dbHelper = require('../common/mongoDBHelper');

exports.getPokemon = () => {
    return dbHelper.getDatabaseInstance().pokemon.find({});
}
