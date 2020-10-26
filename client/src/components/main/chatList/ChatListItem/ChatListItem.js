import React from 'react';
import { apiUrl } from './../../../../config';

export default props => {
    return (
        <li className='list__item'>
            <div className="chat-box">
                <div className="row row_ai-c row_jc-fs">
                    <div>
                        <div className="avatar avatar_chat ">
                            <img src={ `${apiUrl}${props.chatData.avatar}`} alt="emptyUser" />
                        </div>
                    </div>
                    <div className="column">
                        <h1 className="user-name">
                            {props.chatData.name}
                        </h1>
                    </div>
                </div>
            </div>
        </li>
    );
}