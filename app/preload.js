const { remote, ipcRenderer }  =  require('electron');


console.log('Inside Preload');

window.remote = remote;
window.ipcRenderer = ipcRenderer;