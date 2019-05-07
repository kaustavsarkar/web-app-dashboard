import EventEmitter from 'events';

class ServiceMetaEvent extends EventEmitter {
    constructor() {
        super();
    }
    emitServiceMeta() {
        this.emit('get-service-meta', new Date());
    }

    emitLoginEvent() {
        this.emit('sso-login', new Date());
    }
}

module.exports = ServiceMetaEvent;