import React from 'react';

import MessagesListItem from './MessagesListItem/MessagesListItem';
import ScrollBottom from '../../ScrollBottom/ScrollBottom';
 
import './messagesList.scss';

export default props => {
    return (
        <div className="messages-list">
            <ul className='column'>
                {
                    props.messages.map((message) => {
                        return (
                            <MessagesListItem 
                                key={message.id} 
                                userId={props.userId}
                                senderName={message.name}
                                memberId={message.user_id || message.userId} 
                                message={message.message} 
                            />
                        );
                    })
                }
                <ScrollBottom />
            </ul>
        </div>
    )
};