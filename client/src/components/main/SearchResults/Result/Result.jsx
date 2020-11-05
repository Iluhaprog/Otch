import React from 'react';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiUrl } from '../../../../config';

import './result.scss';

export default props => {
    return (
        <li>
            <div className="result-box">
                <div className="row row_jc-sb row_ai-c">
                    <div className="user-info">
                        <div className='row row_ai-c'>
                            <div>
                                <div className="avatar">
                                    <img src={apiUrl + props.avatar} alt="emptyUser" />
                                </div>
                            </div>
                            <h1 className="user-name">
                                {props.name}
                            </h1>
                        </div>
                    </div>
                    <div className='buttons-box row'>
                        <button className="button button_send">
                            Add to
                        </button>
                        <button className="button button_i-b fsz-24">
                            <FontAwesomeIcon icon={ faComment } />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}