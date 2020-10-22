import React from 'react';
import './iconButton.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
    return (
        <button className="button button_i button_i-gr" onClick={props.onClick}>
            <FontAwesomeIcon className='icon' icon={props.icon} />
        </button>
    );
};