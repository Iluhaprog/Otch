import React from 'react';
import { apiUrl } from '../../../../config';

import emptyUser from '../../../../assets/images/emptyUser.png'
import { NavLink } from 'react-router-dom';

export default props => {
    const selectedSelector = props.selected ? 'chat-box_selected' : '';
    const subPath = props.chatData.name.toLowerCase().split(' ').join('-');
    return (
        <li className='list__item'>
            <NavLink 
                to={`/chat/${subPath}`}
                className={`chat-box ${selectedSelector}`} 
                onClick={e => props.onClick(props.chatData)}>
                <div className="row row_ai-c row_jc-fs">
                    <div>
                        <div className="avatar avatar_chat ">
                            {
                                props.chatData.avatar 
                                ? <img src={`${apiUrl}${props.chatData.avatar}`} alt="chat" />
                                :  <img src={emptyUser} className='empty' alt="empty" />
                            }
                        </div>
                    </div>
                    <div className="column">
                        <h1 className="user-name">
                            {props.chatData.name}
                        </h1>
                    </div>
                </div>
            </NavLink>
        </li>
    );
}