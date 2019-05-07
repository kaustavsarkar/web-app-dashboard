import React, { useState } from 'react';
import { CardContext } from '../context-store/card-context';

const CardDeck = (props) => {

    const [card, setState] = useState({
        id:'my-app',
        cardName: 'Application',
        url: 'https://myapp.com/'
    });

    return (<CardContext.Provider value={card}>
        <applicationCard onClick={props.onClick}/>
    </CardContext.Provider>);
}

export default CardDeck;