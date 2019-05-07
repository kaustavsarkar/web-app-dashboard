const filterResource = {
    urls: []
}

/**
 * Use this later when you want to save
 * stuff in file system rather than disk cache
 * @param {*} session 
 */
export const DashInterceptor = (session) => {


    const resWebRequest = session.webRequest;

    resWebRequest.onBeforeRequest(filterResource, (details, callback) => {
        callback({});
    });

    resWebRequest.onBeforeSendHeaders(filterResource, (details, callback) => {
        callback({});
    });

    resWebRequest.onSendHeaders(filterResource, (details) => {

    });

    resWebRequest.onHeadersReceived(filterResource, (details, callback) => {
        
        callback({});
    });

    resWebRequest.onResponseStarted(filterResource, (details) => {

    });

    resWebRequest.onBeforeRedirect(filterResource, (details) => {

    });

    resWebRequest.onCompleted(filterResource, (details) => {

    });

    resWebRequest.onErrorOccurred(filterResource, (details) => {

    });
};