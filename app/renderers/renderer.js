import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { remote, ipcRenderer } from 'electron';


const currentDashboard = remote.getCurrentWindow();
let dashWin;
const handleClick = (url, id) => {

    console.log(currentDashboard.webContents);
    console.log(url);
    console.log(id);

    ipcRenderer.send('request-dash-open', url, id);
    //MainProcess.openDashboard(currentDashboard, url, id);
}


const unleashMaster = async () => {
    const { default: CardDeck } = await import('../components/cardeck');



    render(
        <AppContainer>
            <CardDeck onClick={handleClick} />
        </AppContainer>,
        document.getElementById('master')
    );
}
unleashMaster();
if (module.hot) { module.hot.accept(unleashMaster); }