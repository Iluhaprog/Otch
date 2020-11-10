import React from 'react';
import './sendButton.scss';

export default props => {
    return (
        <button className="button button_send" onClick={props.onClick}>
            {props.text}
            {props.children}
        </button>
    );
};