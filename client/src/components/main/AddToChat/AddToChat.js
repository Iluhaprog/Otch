import React from 'react';
import FormBox from '../FormBox/FormBox';
import AddToChatItem from './AddToChatItem/AddToChatItem';
import SendButton from '../../buttons/SendButton/SendButton';
import {addMember} from '../../../api/chat.api';

import './addToChat.scss';

class AddToChatForm extends React.Component {
    state = {
        chats: new Map(),
        errorsMessages: []
    }

    handleSubmit(e) {
        e.preventDefault()
        const wss = this.props.webSocket;
        let errorsMessages = [];
        [...this.state.chats.keys()].forEach(key => {
            addMember({
                adminId: this.props.adminId,
                memberId: this.props.memberId,
                key: key
            }).then(result => {
                let errorMessage;
                if (result.status === 1) {
                    wss.send(JSON.stringify({userId: this.props.memberId}));
                    this.props.changeVisibility(false);
                }
                if (result.status === 6) {
                    errorMessage = `User exist in chat ${this.state.chats.get(key)}`;
                }
                if (result.status === 5) {
                    errorMessage = `You are not a chat admin for ${this.state.chats.get(key)}`;
                }
                errorsMessages.push(errorMessage);
                this.setState({errorsMessages: errorsMessages});
            });
        });
    }

    handleChange(e, chatName) {
        const chats = this.state.chats;
        if (e.target.checked) {
            chats.set(e.target.value, chatName);
        } else {
            chats.delete(e.target.value);
        }
        this.setState({
            chats: chats
        });
    }

    render() {

        let visible = this.props.visible ? 'add-member-to-chat-box_visible' : '';
        return (
            <div className={`add-member-to-chat-box ${visible}`}>
                <div className='row row_jc-c row_ai-c'>
                    <FormBox>
                        <div class='errors'>
                            {
                                this.state.errorsMessages.length 
                                    ? this.state.errorsMessages.map(error => <p>{error}</p>)
                                    : ''
                            }
                        </div>
                        <form onSubmit={e => this.handleSubmit(e)}>
                            <ul>
                                {
                                    this.props.chats.map(chat => {
                                        return (
                                            <AddToChatItem
                                                chatData={chat}
                                                onChange={(e, chatName) => this.handleChange(e, chatName)}
                                            />
                                        )
                                    })
                                }
                            </ul>
                            <SendButton text='ADD' />
                            <SendButton 
                                text='Close' 
                                onClick={() => {
                                        this.setState({errorsMessages: new Map()})
                                        this.props.changeVisibility(false)
                                    }
                                } 
                            />
                        </form>
                    </FormBox>
                </div>
            </div>
        );
    }
}

export { AddToChatForm }