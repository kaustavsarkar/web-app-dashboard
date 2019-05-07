import { app, BrowserWindow, ipcMain, Tray, Menu, Notification, nativeImage } from 'electron';
import path from 'path';
import url from 'url';
import { enableLiveReload } from 'electron-compile';
import { DashInterceptor } from './interceptor/resource-interceptor';
import { ServiceInterceptor } from './interceptor/service-interceptor';
import Scheduler from './events/scheduler/service-scheduler';

enableLiveReload({ strategy: 'react-hmr' });
let mainWin;
export let tray = null;
let dashWin;
let scheduler = new Scheduler();
let counter = 0;
export const createTray = () => {
    console.log(tray);
    if (!tray) {
        console.log('Creating Tray');
        tray = new Tray(path.join(__dirname, getIcon()));
        if (process.platform === 'win32') {
            tray.on('click', () => {
                console.log('tray cliked')
                tray.displayBalloon({
                    icon: nativeImage.createFromPath(path.join(__dirname, './icons/icon-light@2x.png')),
                    title: "clicked",
                    content: "clicked " + counter++
                });
                //tray.popUpContextMenu();
            });

            activateMenu();
        }

        tray.on('balloon-show', () => {
            console.log('Balloon shown');
        });
    }
};
const activateMenu = () => {
    const menu = Menu.buildFromTemplate([
        {
            label: 'Master Dashboard',
            accelerator: 'Shift+CommandOrControl+M',
            click() { createWindow() }
        },
        { type: 'separator' },
        { type: 'separator' },
        {
            label: 'Quit',
            click() { app.quit(); },
            accelerator: 'CommandOrControl+Q'
        }
    ]);
    tray.setContextMenu(menu);
}
const createWindow = () => {

    mainWin = new BrowserWindow({
        center: true,
        resizable: true,
        show: false,
        webPreferences: {
            nodeIntegrationInWorker: false,
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    //mainWin.maximize();
    //mainWin.webContents.openDevTools();

    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        slashes: true,
        protocol: 'file'
    }), { "extraHeaders": "Cache-Control: no-cache\n" });

    //console.log('indexjs sched',Scheduler);
    scheduler._init_()//Starting scheduler jobs


    mainWin.on('ready-to-show', () => {
        mainWin.show();
        mainWin.maximize();
    });

    mainWin.on('close', () => {
        console.log('Inside Window Close');
        createTray();
    });

    mainWin.on('closed', () => {
        console.log('Inside Window Closed');
        mainWin = null;
    });
}

const createDashWindow = (url) => {
    dashWin = new BrowserWindow({
        center: true,
        resizable: true,
        show: false,
        webPreferences: {
            nodeIntegrationInWorker: false,
            contextIsolation: false,
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), './app/preload.js')
        }
    });


    //dashWin.webContents.openDevTools();


    dashWin.on('ready-to-show', () => {
        dashWin.show();
        dashWin.maximize();
    });

    console.log(dashWin.webContents.id);

    dashWin.loadURL(url, { "extraHeaders": "Cache-Control: no-cache\n" });

    DashInterceptor(dashWin.webContents.session);
    ServiceInterceptor(dashWin.webContents.session);
};
app.on('login', (event, webContents, request, authInfo, callback) => {
    console.log('login event');
})
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    console.log('Inside App window all closed');
    createTray();
});
app.on('before-quit', () => {
    console.log('before app quit');
})
export const getIcon = () => {
    if (process.platform === 'win32') return './icons/icon-light@2x.ico';
    return './icons/icon-light@2x.ico';
}
ipcMain.on('request-dash-open', (event, url, id) => {

    console.log(mainWin.webContents.getURL());
    if (mainWin.webContents.getURL().includes('app/index.html')) {

        createTray();

        createDashWindow(url);
        console.log(url);


        mainWin.close();
    }

    event.sender.send('resp-dash-open', dashWin, id);
    //currentWindow.webContents.send('open-dash', win.webContents, id);
});

