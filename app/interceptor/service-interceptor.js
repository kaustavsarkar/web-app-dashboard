import ServiceDelegate from '../db-delegate/service-delegate';
import URLDelegate from '../db-delegate/url-delegate';


function getUrlArray(serviceObjects) {
    console.log("My Urls ",serviceObjects.map(serviceObject => serviceObject.url))
    return serviceObjects.map(serviceObject => serviceObject.url);
}

const serviceFilters = {
    urls: () => {
        ServiceDelegate.getAllServices(getUrlArray);
    }
};
const filters = {
    urls: []
};

export const ServiceInterceptor = (session) => {
    const resWebRequest = session.webRequest;

    // resWebRequest.onBeforeRequest(serviceFilters, (details, callback) => {

    //     callback({});
    // });
    resWebRequest.onSendHeaders(serviceFilters, (details) => {
        let urlObject = {};
        urlObject.url = details.url;
        urlObject.requestHeaders = details.requestHeaders;
        urlObject.method = details.method;
        urlObject.lastFiredDate = new Date();
        urlObject.lastHeaderUpdated = new Date();

        URLDelegate.addURL(urlObject);

    });
    resWebRequest.onHeadersReceived(serviceFilters, (details, callback) => {
        callback({});
    });
};

