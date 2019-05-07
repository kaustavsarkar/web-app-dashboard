import URLDelegate from '../db-delegate/url-delegate';
import { request, requestServiceMeta } from '../restclient/RestClient';
import ServiceDelegate from '../db-delegate/service-delegate';
import zlib from 'zlib';
import process from 'process';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { tray, createTray } from '../index';

let ServiceEventListener = {
    loginOptions: {
        icon: path.join(__dirname, '../icons/icon-light@2x.png'),
        title: "Login Required",
        content: "You need to provide SSO login."
    },
    register(scheduler) {
        console.log('Registering Event Listener');
        scheduler.on('app-sched-job', (source) => {
            console.log('Listening to event');
            URLDelegate.getAll((docs) => docs.forEach(urlObject => {
                request(urlObject, this.handleAppResponse);
            }));
        });
    },

    registerServiceMeta(servMetaEvent) {
        console.log('Registering Service Meta Listener');
        servMetaEvent.once('get-service-meta', (url) => {
            requestServiceMeta(url, this.handleServiceMetaResponse);
        });
    },

    handleServiceMetaResponse(response) {

        let output;

        let data = '';
        console.log('Node env', process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'production') {
            if (response.headers['content-encoding'] === 'gzip') {
                let gzip = zlib.createGunzip();
                response.pipe(gzip);
                output = gzip;
            } else {
                output = res;
            }

            output.on('data', (chunk) => {
                data += chunk.toString('utf8');
            });
            output.on('end', () => {
                console.log(data);
                //Create Db objects in service meta db
                let serviceMetas = JSON.parse(data);
                ServiceDelegate.verifyUpsertMeta(serviceMetas);
            });
        } else {
            let data = fs.readFileSync(path.join(__dirname, 'service-meta.json'));
            ServiceDelegate.verifyUpsertMeta(JSON.parse(data));
        }
    },
    handleAppResponse(response) { //Object of Incoming Message
        //console.log('reponse=====> : ', response.headers);
        //console.log(response);
        //console.log('reponse=====> : ', response.statusCode);
        //console.log('reponse=====> : ', response.statusMessage);
        //console.log('reponse=====> : ', response.statusCode);

        //console.log('reponse=====> : ', response.socket._httpMessage.agent.protocol + response.socket.servername + response.socket._httpMessage.path);
        let protocol = response.socket._httpMessage.agent.protocol;
        let host = response.socket.servername;
        let path = response.socket._httpMessage.path;
        let requestUrl = new URL(protocol + "//" + host + path);
        let output;
        if (response.statusCode === 302) {

            //console.log("inside 302 check");
            //Show Notification/Balloon
            if (!tray) {
                createTray();
            }
           // tray.displayBalloon(ServiceEventListener.loginOptions);
            //Add rest services in some queue perhaps to avoid multiple such notifications
        }
        if (response.statusCode !== 200) {
            return;
        }
        if (response.headers['content-encoding'] === 'gzip') {
            let gzip = zlib.createGunzip();
            response.pipe(gzip);
            output = gzip;
        } else {
            output = response;
        }

        let data = '';

        output.on('data', (chunk) => {
            data += chunk.toString('utf8');
        });
        output.on('end', () => {
            /**add to database */
            console.log(requestUrl.pathname);
            console.log(requestUrl.searchParams);
            console.log(requestUrl.search);
           // console.log('data', data);
        });

    },
}
module.exports = ServiceEventListener;