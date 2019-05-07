import DataSource from 'nedb';
import path from 'path';

const IDX_SERV_NAME = 'serviceName';
const IDX_DB_NAME = 'dbName';
let db;

let ServiceDB = {
    /**
     * Change fire to once per application lifecycle 
     * event
     */
    fireup: () => {
        if (!db) {
            db = new DataSource({
                filename: path.join(__dirname, './data/service-meta.db'),//this shall change to user data in production
                autoload: true, //Auto load is set to true because it shall contain objects in order of 100s
                afterSerialization: (doc) => {
                    //TODO use node rsa
                    return doc;
                },
                beforeDeserialization: (doc) => {
                    //TODO use node rsa
                    return doc;
                }
            });
            db.loadDatabase();

            //After every 10 mins database shall be compacted
            db.persistence.setAutocompactionInterval(10 * 60 * 1000); //this is modified to add values in minutes
            //Add indices
            db.ensureIndex({
                fieldName: IDX_SERV_NAME,
                unique: true,
                sparse: false
            });
            db.ensureIndex({
                fieldName: IDX_DB_NAME,
                unique: false,
                sparse: true
            });

        }
    },

    addService: (serviceObject) => {
        db.update({ 'serviceName': serviceObject.serviceName, 'method': serviceObject.method },
            serviceObject,
            { upsert: true },
            (error, numReplaced, upsert) => {
                //TODO
            });
    },

    getAll: (callback) => {
        db.find({}, (error, docs) => {
            callback(docs, error);
        });
    },

    getService: (serviceName, method, callback) => {
        db.find({ 'serviceName': serviceName, 'method': method },
            (error, doc) => {
                callback(doc, error);
            });
    }

}

module.exports = ServiceDB;

