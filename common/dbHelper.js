const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const databaseConfig = require('../config/databaseConfig');
const q = require('q');

let mongoClient;
let database;

exports.connectToDatabase = (app) => {
    let deferred = q.defer();

    const uri = `mongodb://${databaseConfig.DB_USER}:${databaseConfig.DB_PASSWORD}@${databaseConfig.DB_HOST}/${databaseConfig.DB_NAME}?retryWrites=true&w=majority`;

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

const getAll = (collectionName, query = {}, sort = {}, limit = 0) => {
    let deferred = q.defer();

    const collection = database.collection(collectionName);
    collection.find(query, {sort, limit}).toArray().then(result => {
        const data = result.map(currentData => {
            if (currentData._id) {
                currentData.id = currentData._id;
                delete currentData._id;
            }

            return currentData;
        });

        deferred.resolve(data);
    }).catch(error => {
       deferred.reject(error);
    });

    return deferred.promise;
}
exports.getAll = getAll;

const get = (collectionName, query = {}) => {
    let deferred = q.defer();

    getAll(collectionName, query, {}, 1).then(result => {
        deferred.resolve(result[0]);
    }).catch(error => {
        deferred.reject(error);
    });

    return deferred.promise;
}
exports.get = get;

exports.getById = (collectionName, id) => {
    const query = {_id: new ObjectID(id)};
    return get(collectionName, query);
}

exports.insert = (collectionName, documentData) => {
    let deferred = q.defer();
    const collection = database.collection(collectionName);

    if (documentData.hasOwnProperty('id')) delete documentData.id;
    if (documentData.hasOwnProperty('_id')) delete documentData._id;

    collection.insertOne(documentData).then(result => {
        documentData.id = result.insertedId.toString();
        delete documentData._id;

        deferred.resolve(documentData);
    }).catch(error => {
        deferred.reject(error);
    })

    return deferred.promise;
}

const update = (collectionName, documentData, query, shouldUpsert = false) => {
    const collection = database.collection(collectionName);

    if (documentData.hasOwnProperty('id')) delete documentData.id;
    if (documentData.hasOwnProperty('_id')) delete documentData._id;

    return collection.updateOne(query, {$set: documentData}, {shouldUpsert});
}
exports.update = update;

exports.updateById = (collectionName, documentData, id, shouldUpsert = false) => {
    const query = {_id: new ObjectID(id)};
    return update(collectionName, documentData, query, shouldUpsert);
}
