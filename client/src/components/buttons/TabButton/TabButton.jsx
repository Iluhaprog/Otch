import React from 'react';
import './tabButton.scss';

export default props => {
    const borderLeft = props.bl ? 'button_tab-bl' : '';
    return (
        <button className={`button button_tab ${borderLeft}`} onClick={props.click}>
            <span>
                {props.text}
            </span>
        </button>
    );
};