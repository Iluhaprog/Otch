import React from 'react';
import { faPaperPlane, faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleChange } from '../../../../util/forms';
import { sendMessage } from '../../../../api/messages.api';
import SendButton from '../../../buttons/SendButton/SendButton';

import './messengerFrom.scss';

class MessengerForm extends React.Component {
    state = {
        message: '',
        files: [],
    }
    fileInput = React.createRef();

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.files.length) {
            const message = this.state.message;
            const wss = sendMessage({
                params: {
                    key: this.props.chat.key,
                    ui: this.props.userId,
                    ci: this.props.chatId,
                    a: 'c',
                },
                onopen: () => {
                    wss.send(JSON.stringify({
                        userId: this.props.userId,
                        chatId: this.props.chatId,
                        name: this.props.senderName,
                        message: message,
                    }));
                },
                onmessage: e => {
                    const message  = JSON.parse(JSON.parse(e.data).data);
                    this.sendFile(message.id);
                    wss.close();
                },
                onerror: err => console.error(err),
            });
        } else {
            const wss = this.props.webSocket;
            wss.send(JSON.stringify({
                userId: this.props.userId,
                chatId: this.props.chatId,
                name: this.props.senderName,
                message: this.state.message,
            }));
        }
        this.setState({
            message: '',
        });
    }

    sendFile(messageId) {
        const file = this.state.files[0];
        const wss = sendMessage({
            params: {
                key: this.props.chat.key,
                ui: this.props.userId,
                ci: this.props.chatId,
                mi: messageId,
                a: 'i',
            },
            onopen: () => {
                wss.send(file);
                wss.close();
                this.setState({
                    files: [],
                });
            },
            onmessage: e => console.log(e.data),
            onerror: err => console.error(err),
        });

    }

    selectFile(e) {
        e.preventDefault();
        this.fileInput.current.click();
    }

    setFiles(e) {
        if (e.target.files) {
            this.setState({
                files: Array.from(e.target.files)
            });
        }
    }

    render() {
        return (
            <form className="form-message" onSubmit={e => this.handleSubmit(e)}>
                <div className="row row_ai-c">
                    <textarea
                        name="message"
                        cols="30"
                        rows="10"
                        placeholder="Write messages..."
                        value={this.state.message}
                        onChange={e => handleChange(e, this)}
                    >
                    </textarea>
                    <SendButton onClick={e => this.selectFile(e)}>
                        <FontAwesomeIcon icon={faFileUpload} />
                    </SendButton>
                    <SendButton>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </SendButton>
                    <input
                        ref={this.fileInput}
                        type='file'
                        style={{ display: 'none' }}
                        onChange={e => this.setFiles(e)}
                    />
                </div>
            </form>
        );
    }
}

export default MessengerForm;