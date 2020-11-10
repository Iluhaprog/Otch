import React from 'react';

import MessagesListItem from './MessagesListItem/MessagesListItem';
import ScrollBottom from '../../ScrollBottom/ScrollBottom';
 
import './messagesList.scss';

export default props => {
    return (
        <div className="messages-list">
            <ul className='column'>
                {
                    props.messages.map((message, index) => {
                        const id = message.id || (index ? props.messages[index - 1].id + 1 : 1);

                        return (
                            <MessagesListItem 
                                key={id} 
                                userId={props.userId}
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