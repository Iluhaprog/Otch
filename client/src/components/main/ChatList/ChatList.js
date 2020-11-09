import React from 'react';
import IconButton from '../../buttons/IconButton/IconButton';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ChatListItem from './ChatListItem/ChatListItem';

import './chatList.scss';

class ChatList extends React.Component {
    state = {
        selectedChat: -1,
    }

    handleChatSelection(chat) {
        this.setState({
            selectedChat: chat.id,
        });
        this.props.changeChat(chat);
    }

    render() {
        return (
            <div className="chats-list">
                <div className="row row_ai-c clr">
                    <div className="chats-list-box">
                        <div className="column top">
                            <ul className='list'>
                                {this.props.chatList.map(chat => {
                                    let selected = chat.id === this.state.selectedChat;
                                    return (
                                        <ChatListItem 
                                            chatData={chat} 
                                            key={chat.id} 
                                            selected={selected} 
                                            onClick={this.handleChatSelection.bind(this)}
                                        />
                                    )
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