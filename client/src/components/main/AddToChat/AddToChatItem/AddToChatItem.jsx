import React from 'react';
import { apiUrl } from '../../../../config';
import emptyUser from '../../../../assets/images/emptyUser.png';

import './addToChatItem.scss';

export default props => {
    return (
        <li>
            <div className='row row_jc-sb row_ai-c'>
                <div className='row row_ai-c'>
                    <div className="avatar avatar_chat ">
                        {
                            props.chatData.avatar
                                ? <img src={`${apiUrl}${props.chatData.avatar}`} alt="chat" />
                                : <img src={emptyUser} className='empty' alt="empty" />
                        }
                    </div>
                    <div className="column">
                        <h1 className="user-name">
                            {props.chatData.name}
                        </h1>
                    </div>
                </div>
                <input
                    className='checkbox'
                    type='checkbox'
                    name={props.chatData.name.split('').join('')}
                    value={props.chatData.key}
                    onChange={e => props.onChange(e, props.chatData.name)}
                    />
            </div>
        </li>
    );
}