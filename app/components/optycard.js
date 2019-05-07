import React from 'react';
import { CardContext } from '../context-store/card-context';

const applicationIcon = (props) => {
    return (
        <CardContext.Consumer>
            {card => (
                <div className="flat-grid-cell">
                    <div id={card.id} className="app-nav-item"
                        destinationurl={card.url}
                        onClick={props.onClick.bind(this, card.url, card.id)}>
                        <svg className="svg-nav suiicon svg-bkgd08">
                            <path className="svg-shortcut"
                                d="M28 42.5l-3 2.7v-1.7c-.4 0-1.4 0-2.5.6-1.3 1-1.5 1.6-1.5 1.6s-.4-1.2.8-2.7c1.2-1.6 2.6-1.7 3.2-1.6v-1.6l3 2.7z">
                            </path>
                            <path className="svg-cluster"
                                d="M28.5 41.3c.6 0 1.2.5 1.2 1.2s-.6 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2zm-4 0c.6 0 1.2.5 1.2 1.2s-.6 1.2-1.2 1.2c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2zm-4 0c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2z">
                            </path>
                            <path className="svg-icon18"
                                d="M29 18.3c-5.4 0-9.8 4.5-9.8 10 0 1.6.4 3.3 1.2 4.7H14c-2.3 0-4-2-4-4V19c0-2.2 1.7-4 4-4h18c2.2 0 4 1.7 4 4v2.4c-1.8-2-4-3-7-3zM27 14v-1h-7v1h-2v-3h11v3h-2z">
                            </path>
                            <path className="svg-icon09"
                                d="M29.5 37c-4.8 0-8.6-3.7-8.6-8.5 0-4.7 3.7-8.5 8.5-8.5s8.6 3.8 8.6 8.5c0 4.8-3.8 8.6-8.5 8.6zM24 33h11v-1h-1v-5h-2v5h-1.3v-5h-2.3v5H27v-5h-2v5h-1v1zm5.4-11l-6.2 4h12.6l-6.4-4z">
                            </path>
                            <path className="svg-outline"
                                d="M28.81 19.21a9.6 9.6 0 0 0-8.45 14.16H13.8a3.8 3.8 0 0 1-3.8-3.78v-10a3.8 3.8 0 0 1 3.8-3.8h18.22a3.8 3.8 0 0 1 3.8 3.8v2.68a9.56 9.56 0 0 0-7-3.05zM26.19 15.69v-2.22h-6.63v2.22H17v-3.5a1.12 1.12 0 0 1 1.12-1.12h9.48a1.12 1.12 0 0 1 1.12 1.12v3.5h-2.53z">
                            </path>
                            <path className="svg-outline"
                                d="M28.81 38.41a9.6 9.6 0 1 1 9.6-9.6 9.6 9.6 0 0 1-9.6 9.6zM32.78 25l-4.24-2.3L24.5 25v1.25h8.28V25zm1.13 7.13H33v-1h-8.47v1h-.94v1.28h10.35zm-5.13-5.85V31m2.37-4.62v4.66m-4.8-4.72v4.72">
                            </path>
                        </svg><a id="c_a57ad9a453e14c3a9cd54c6f2ebb8bbd_0" className="app-nav-label flat-grid-nav-label"
                            href="#">{card.cardName}</a></div>
                </div>
            )}
        </CardContext.Consumer>
    );
}
export default applicationIcon;