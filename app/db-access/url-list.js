import DataSource from 'nedb';
import path from 'path';
/**
 * This Data Source shall be used to store URLs
 * 1. Complete path
 * 2. Request headers
 * 4. Method
 * 5. Last Status Code
 * 6. Last Fired
 * 7. Last header updated
 */

const IDX_URL = 'url';
const IDX_LAST_FIRED = 'lastFired';
const IDX_LAST_HEADER_UPDATED = 'lastHeaderUpdated';
let db;
let URLDB = {
    fireup: () => {
        if (!db) {
            db = new DataSource({
                filename: path.join(__dirname, './data/urls.db'),//this shall change to user data in production
                autoload: false, //Auto load is set to false because size is expected to increase to several hundreds of MBs
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
                fieldName: IDX_URL,
                unique: true,
                sparse: false
            });
            db.ensureIndex({
                fieldName: IDX_LAST_FIRED,
                unique: false,
                sparse: true
            });
            db.ensureIndex({
                fieldName: IDX_LAST_HEADER_UPDATED,
                unique: false,
                sparse: true
            });
        }
    },

    findUrl: (url, callback) => {
        db.findOne({ 'url': url }, (error, doc) => {
            callback(doc);

        });

    },

    findAll: (callback) => {
        db.find({}, (error, doc) => {
            callback(doc);
        })
    },

    /**
     * This function shall create a new object if there is not existing one present.
     * Else it shall replace any existing document
     * @param {} urlObject 
     */
    addUrl: (urlObject) => {
        db.update({ 'url': urlObject.url },
            urlObject,
            { upsert: true },
            (err, numUpdatedDocs, upsert) => {
                //console.error(err);
            });
    },

    /**
     * This method shall be used to update the below stuff.
     * Nothing else is supposed to be inserted
     * @param {*} urlObject 
     */
    updateLastFiredDate: (urlObject) => {
        db.update({ 'url': urlObject.url },
            { $set: { 'lastFiredDate': urlObject.lastFiredDate } },
            (error, numReplaced, upsert) => {
                //console.log('is upsert',upsert)
                //TODO
            });

        console.log('last Fired: ', urlObject.url);
        URLDB.findUrl(urlObject.url, (doc) => {
            //  console.log(doc);
        })
    },
    updateLastStatusCode: (urlObject) => {
        db.update({ 'url': urlObject.url },
            { $set: { 'lastStatusCode': urlObject.lastStatusCode } },
            (error, numReplaced) => {
                //TODO
            });
        // console.log('last status: ', urlObject.url);
    },

    updateRequestHeader: (urlObject) => {
        db.update({ 'url': urlObject.url },
            {
                $set: {
                    'requestHeaders': urlObject.requestHeaders,
                    'lastHeaderUpdated': urlObject.lastHeaderUpdated
                }
            },
            (error, numReplaced) => {
                //TODO
            });
        //console.log('Request Header: ', urlObject.url);
    },
    updateCookiesForAll: (cookie) => {
        db.update({}, {
            $set: {
                'requestHeaders.Cookie': cookie
            },
        }, (error, numReplaced, upsert) => {

        });
    }

};
/**
 * Prevents any mutation of 
 * Object
 */
let urlDB = Object.freeze({
    default: URLDB
});

let urlDatabase = urlDB.default || URLDB;

module.exports = urlDatabase;

