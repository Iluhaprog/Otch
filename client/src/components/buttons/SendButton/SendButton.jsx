import React from 'react';
import './sendButton.scss';

export default props => {
    return (
        <button className="button button_send">
            {props.text}
        </button>
    );
};