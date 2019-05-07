import URLDB from '../db-access/url-list';


const URLDelegate = {
    addURL: (urlObject) => {
        let url = urlObject.url;
        URLDB.findUrl(url, (dbUrl) => {
            //If URl is not present then add it
            if (!dbUrl) {
                URLDB.addUrl(urlObject);
            } else {
                URLDelegate.updateURLObject(urlObject, dbUrl);
            }

        });
    },
    getAll: (callback) => {
        console.log('getall')
        URLDB.findAll(callback);
    },
    updateURLObject: (urlObject, dbUrl) => {
        let requestHeaders = urlObject.requestHeaders;
        let cookies = requestHeaders.Cookie;
        let dbCookies = dbUrl.requestHeaders.Cookie;
        if (cookies === dbCookies) {
            URLDB.updateLastFiredDate(urlObject);
        } else {
            if (urlObject.lastStatusCode !== undefined
                && urlObject.lastStatusCode !== null
                && urlObject.lastStatusCode !== '') {
                URLDB.updateLastStatusCode(urlObject);
            }
            URLDB.updateRequestHeader(urlObject);
        }
    }
};

module.exports = URLDelegate;