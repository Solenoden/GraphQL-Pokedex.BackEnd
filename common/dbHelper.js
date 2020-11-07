const MongoClient = require('mongodb').MongoClient;
const databaseConfig = require('../config/databaseConfig');
const q = require('q');

let mongoClient;
let database;

exports.connectToDatabase = (app) => {
    let deferred = q.defer();

    const uri = `mongodb+srv://${databaseConfig.DB_USER}:${databaseConfig.DB_PASSWORD}@cluster0.151v2.mongodb.net/${databaseConfig.DB_NAME}?retryWrites=true&w=majority`;

    if (!mongoClient) {
        mongoClient = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        mongoClient.connect(error => {
            console.log('processId:' + process.pid + ' Connected to database');
            app.on('close', () => {
                mongoClient.close();
            });

            database = mongoClient.db(databaseConfig.DB_NAME);

            (error) ? deferred.reject(error) : deferred.resolve();
        });
    }

    return deferred.promise;
}

const getAll = (collectionName, query = {}, sort = {}, limit = -1) => {
    let deferred = q.defer();
    const collection = database.collection(collectionName);

    collection.find(query, {sort, limit}).toArray().then(result => {
        deferred.resolve(result);
    }).catch(error => {
        deferred.reject(error);
    });

    return deferred.promise;
}
exports.getAll = getAll;

exports.get = (collectionName, query = {}) => {
    let deferred = q.defer();

    getAll(collectionName, query, {}, 1).then(result => {
        deferred.resolve(result[0]);
    }).catch(error => {
        deferred.reject(error);
    });

    return deferred.promise;
}