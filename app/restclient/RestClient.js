import https from 'https';
import url from 'url';
export let request = (urlObject, callback) => {
    let reqUrl = url.parse(urlObject.url);
    let options = {
        host: reqUrl.host,
        headers: urlObject.requestHeaders,
        method: urlObject.method,
        path: reqUrl.path,
        port: reqUrl.port
    };
    let request = https.request(options, callback);
    request.on('error', (error) => {
        console.log('the error is', error);
        callback(error);
    });
    request.end();
};

export let requestServiceMeta = (url, callback) => {
    let request = https.request(url, callback);

    request.on('error', (error) => {
        console.log('meta error : ',error);
        callback(error);
    });


    request.end();
}