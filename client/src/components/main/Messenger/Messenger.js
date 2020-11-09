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

    componentDidMount() {
        this._isMounted = true;
        this._key = this.props.chat.key;
        this.getMessages()
                .then(() => {
                    this.createWebSocket();
                });
    }
    
    componentDidUpdate() {
        if (this.props.chat.key !== this._key) {
            this.state.wss.close();
            this._key = this.props.chat.key;
            this.getMessages()
                .then(() => {
                    this.createWebSocket();
                });
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
            onopen: () => console.log('open'),
            onmessage: e => {
                const messages = this.state.messages;
                const message = JSON.parse(e.data);
                messages.push(JSON.parse(message.data))
                this.setState({
                    messages: messages
                });
            },
            onerror: () => {
                console.error('Message dont send');
            }
        });

        console.log(newWss);

        if (chat.id) {
            this.setState({
                wss: newWss
            });
            console.log('Created');
        } else {
            console.log('Chat is not defined');
        }
    }
    
    render() {
        return ( 
            <div className="messages">
                <div className="row row_jc-c row_ai-c">
                    <div className='messages-box'>
                        <MessagesList messages={this.state.messages} />
                        <MessengerForm 
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