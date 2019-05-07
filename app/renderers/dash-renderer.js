ipcRenderer.on('resp-dash-open', (event, win, id) => {
    console.log(dashWin);
    dashWin = win;
    dashWin.show();
    
    console.log(event);
    console.log(id);
});