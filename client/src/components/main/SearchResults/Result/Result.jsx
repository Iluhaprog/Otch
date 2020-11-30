import React from 'react';
import { apiUrl } from '../../../../config';
import emptyUser from '../../../../assets/images/emptyUser.png'

import './result.scss';

const addToChat = (memberId, changeMemberId, changeVisibility) => {
    changeMemberId(memberId);
    changeVisibility(true);
}

export default props => {
    return (
        <li>
            <div className="result-box">
                <div className="row row_jc-sb row_ai-c">
                    <div className="user-info">
                        <div className='row row_ai-c'>
                            <div>
                                <div className="avatar">
                                    {props.avatar
                                        ? <img src={apiUrl + props.avatar} alt={props.name} />
                                        :  <img src={emptyUser} className='empty' alt="empty" />
                                    }
                                </div>
                            </div>
                            <h1 className="user-name">
                                {props.name}
                            </h1>
                        </div>
                    </div>
                    <div className='buttons-box row'>
                        <button 
                            className="button button_send" 
                            onClick={() => addToChat(props.userId, props.changeMemberId, props.changeVisibility)}
                        >
                            Add to
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}