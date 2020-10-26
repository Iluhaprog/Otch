import React from 'react';
import IconButton from '../../buttons/IconButton/IconButton';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ChatListItem from './ChatListItem/ChatListItem';

import './chatList.scss';

class ChatList extends React.Component {
    state = {}
    render() {
        return (
            <div className="chats-list">
                <div className="row row_ai-c clr">
                    <div className="chats-list-box">
                        <div className="column top">
                            <ul className='list'>
                                {this.props.chatList.map(chat => {
                                    return <ChatListItem chatData={chat} key={chat.id}/>
                                })}                                
                            </ul>
                        </div>
                        <div className="bottom row row_jc-c">
                            <Link to='/create-chat'>
                                <IconButton icon={faPlusSquare} onClick={e => console.log('ok') }/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatList;