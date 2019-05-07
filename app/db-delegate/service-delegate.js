import ServiceDB from '../db-access/service-meta';

let ServiceDelegate = {

    verifyUpsertMeta: (serviceObjects) => {
        serviceObjects.forEach(serviceObject => {
            return ServiceDB.addService(serviceObject);
        });

    },
    getService: (serviceUrl, method, callback) => {
        ServiceDB.getService(serviceUrl, method, callback);
    },
    getAllServices: (callback) => {
        ServiceDB.getAll(callback);
    }
}

module.exports = ServiceDelegate;