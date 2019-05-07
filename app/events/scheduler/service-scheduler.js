import { Job } from 'node-schedule';
import applicationDB from '../../db-access/app-objects';
import URLDB from '../../db-access/url-list';
import ServiceDB from '../../db-access/service-meta';
import EventEmitter from 'events';
import ServiceEventListener from '../ServiceEventListener';
import ServiceMetaEvent from '../servicemetaevent';

class Scheduler extends EventEmitter {
    constructor() {
        super();
    }
    /**TODO */
    emitAppEvent() {
        console.log('emit event');
        this.emit('app-sched-job', 'scheduler');
    }

};
let appJob;
/**
 * This needs to be invoked when app starts up
 */
//Change it to once event
Scheduler.prototype._init_ = () => {
    console.log('Fire Up App DB')
    applicationDB.fireup(); //Starts App Data Source
    URLDB.fireup();
    ServiceDB.fireup();
    /**
     * Registering listener before emitting it.
     */
    let servMetaEvent = new ServiceMetaEvent();
    ServiceEventListener.registerServiceMeta(servMetaEvent);
    servMetaEvent.emitServiceMeta();
    let scheduler = new Scheduler();
    ServiceEventListener.register(scheduler);

    appJob = new Job('application Refresh', () => {
        scheduler.emitAppEvent();
    }, () => {
        /**this is executed just before job is */
        /**Check if user is online and ping */
        /**Get list of service meta to be tried */
    });

    let s = appJob.schedule('*/1 * * * *');
    appJob.invoke();
    if (!!s) {
        console.log('Job is scheduled');
    }
}
/**
 * This should be invoked before App closes
 */
Scheduler.prototype._tearDown_ = () => {
    appJob.cancel();
}

let sched = Object
    .preventExtensions(Object
        .seal(Object
            .freeze(Scheduler)));


module.exports = sched;