import React from 'react';
import './tabButton.scss';

export default props => {
    const borderLeft = props.bl ? 'button_tab-bl' : '';
    const selected = props.selected ? 'button_tab-selected': '';
    return (
        <button className={`button button_tab ${borderLeft} ${selected}`} onClick={props.click}>
            <span>
                {props.text}
            </span>
        </button>
    );
};