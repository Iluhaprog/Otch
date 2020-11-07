import React from 'react';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiUrl } from '../../../../config';
import { create, addMember } from '../../../../api/chat.api';

import './result.scss';

const createChat = (name, adminId, userId, wss) => {
    const data = new FormData();
    data.append('name', name);
    data.append('adminId', adminId);
    create({
        formData: data,
        success: function(e) {
            const response = JSON.parse(e.target.response);

            addMember({
                adminId: adminId,
                memberId: adminId,
                key: response.data.key,
            }).then(() => {
                wss.send(JSON.stringify({userId: adminId}))
            });

            addMember({
                adminId: adminId,
                memberId: userId,
                key: response.data.key,
            }).then(result => {
                wss.send(JSON.stringify({userId: userId}));
            });
        }
    })
}

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
                                    <img src={apiUrl + props.avatar} alt={props.name} />
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
                        <button className="button button_i-b fsz-24">
                            <FontAwesomeIcon 
                                icon={ faComment } 
                                onClick={() => createChat(props.name, props.adminId, props.userId, props.webSocket)}/>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}