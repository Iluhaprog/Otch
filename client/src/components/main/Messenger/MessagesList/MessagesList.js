import React, { useEffect } from 'react';
 
import './messagesList.scss';
import MessagesListItem from './MessagesListItem/MessagesListItem';

export default props => {
    const name = 'Name';
    let messagesEnd = {};

    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div className="messages-list">
            <ul className='column'>
                {
                    props.messages.map((message, index) => {
                        const id = message.id || (index ? props.messages[index - 1].id + 1 : 1);
                        return (
                            <MessagesListItem key={id} senderName={name} message={message.message} />
                        );
                    })
                }
                <li ref={el => messagesEnd = el}></li>
            </ul>
        </div>
    )
};