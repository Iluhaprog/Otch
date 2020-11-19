import React, { useState } from 'react';
import { apiUrl } from '../../../../config';

import emptyUser from '../../../../assets/images/emptyUser.png'
import { NavLink } from 'react-router-dom';
import { sendMessage } from '../../../../api/messages.api';

export default class ChatListItem extends React.Component {
    state = {
        ws: {},
        notification: false,
    }

    handleNotification(notification) {
        this.setState({
            notification: notification,
        });
    }

    componentDidMount() {
        const ws = sendMessage({
            params: {
                key: this.props.chatData.key,
                ui: this.props.userId
            },
            onopen: () => console.log('open notification'),
            onmessage: msg => {
                if (!this.props.selected) {
                    this.handleNotification(true);
                }
            }
        });
        this.setState({
            ws: ws,
        });
    }

    handleClick() {
        this.props.onClick(this.props.chatData);
        this.handleNotification(false);
    }

    render() {
        const selectedSelector = this.props.selected ? 'chat-box_selected' : '';
        const subPath = this.props.chatData.name.toLowerCase().split(' ').join('-');

        return (
            <li className='list__item'>
                <NavLink 
                    to={`/chat/${subPath}`}
                    className={`chat-box ${selectedSelector}`} 
                    onClick={e => this.handleClick()}>
                    <div className="row row_ai-c row_jc-fs">
                        <div>
                            <div className="avatar avatar_chat ">
                                {
                                    this.props.chatData.avatar 
                                    ? <img src={`${apiUrl}${this.props.chatData.avatar}`} alt="chat" />
                                    :  <img src={emptyUser} className='empty' alt="empty" />
                                }
                            </div>
                        </div>
                        <div className="column">
                            <h1 className="user-name">
                                {this.props.chatData.name}
                            </h1>
                        </div>
                        <span className={'notification ' + 
                            ((this.state.notification && !this.props.selected) 
                                ? 'notification_show' 
                                : '')
                            }>
                        </span>
                    </div>
                </NavLink>
            </li>
        );
    }
}