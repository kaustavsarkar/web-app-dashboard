import { remote, ipcRenderer } from 'electron';

const mainProcess = remote.app;

export const run = ()=>{

}

// ipcRenderer.on(APP_EVENTS.APP_STARTED, (event, url) => {
//     console.log(event);
//     remote.getCurrentWindow().loadURL(url);
// });