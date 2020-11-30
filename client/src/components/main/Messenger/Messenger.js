import React from 'react';

import MessengerForm from './MessengerFrom/MessengerForm';
import MessagesList from './MessagesList/MessagesList';
import { getMessagesByChatId, sendMessage } from '../../../api/messages.api';

import './messenger.scss';

class Messenger extends React.Component {
    state = {
        messages: [],
        wss: {},
    }
    _key = '';
    _isMounted = false;

    init() {
        this.getMessages()
            .then(() => {
                this.createWebSocket();
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this._key = this.props.chat.key;
        this.init();
    }
    
    componentDidUpdate() {
        if (this.props.chat.key !== this._key) {
            this.state.wss.close();
            this._key = this.props.chat.key;
            this.init();
        }
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    getMessages() {
        return getMessagesByChatId(this.props.chat.id)
            .then(result => {
                if(this._isMounted) {
                    this.setState({
                        messages: result.data,
                    });
                }
            });
    }

    createWebSocket() {
        const { chat, userId } = this.props;
        const newWss = sendMessage({
            params: {
                key: chat.key,
                ui: userId,
                ci: chat.id,
                a: 'c',
            },
            onopen: () => {},
            onmessage: e => {
                const messages = this.state.messages;
                const message = JSON.parse(e.data);
                if(message.data.path) {
                    messages.forEach(msg => {
                        if(parseInt(msg.id) === parseInt(message.data.messageId)) {
                            msg.path = message.data.path;
                        }
                    });
                } else {
                    messages.push(JSON.parse(message.data));
                }
                this.setState({
                    messages: messages
                });
            },
            onerror: () => {
                console.error('Message dont send');
            }
        });

        if (chat.id) {
            this.setState({
                wss: newWss
            });
        }
    }
    
    render() {
        return ( 
            <div className="messages">
                <div className="row row_jc-c row_ai-c">
                    <div className='messages-box'>
                        <MessagesList
                            messages={this.state.messages}
                            userId={this.props.userId} />
                        <MessengerForm 
                            senderName={this.props.userName}
                            chat={this.props.chat}
                            messages={this.state.messages}
                            userId={this.props.userId}
                            chatId={this.props.chat.id}
                            webSocket={this.state.wss}/>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Messenger;