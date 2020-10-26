import React from 'react';
import { apiUrl } from './../../../../config';

import emptyUser from '../../../../assets/images/emptyUser.png'

export default props => {
    return (
        <li className='list__item'>
            <div className="chat-box">
                <div className="row row_ai-c row_jc-fs">
                    <div>
                        <div className="avatar avatar_chat ">
                            {
                                props.chatData.avatar 
                                ? <img src={`${apiUrl}${props.chatData.avatar}`} alt="chat" />
                                :  <img src={emptyUser} className='empty' alt="empty" />
                            }
                            <img src={ props.chatData.avatar ? `${apiUrl}${props.chatData.avatar}` : emptyUser} alt="emptyUser" />
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