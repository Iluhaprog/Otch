import React from 'react';
import {faPaperPlane, faFileUpload} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleChange } from '../../../../util/forms';
import SendButton from '../../../buttons/SendButton/SendButton';

import './messengerFrom.scss';

class MessengerForm extends React.Component {
    state = { 
        message: '',
    }

    handleSubmit(e) {
        e.preventDefault();
        const wss = this.props.webSocket;
        wss.send(JSON.stringify({
            userId:  this.props.userId,
            chatId: this.props.chatId,
            message: this.state.message,
        }));
        this.setState({
            message: '',
        })
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
                    <SendButton>
                        <FontAwesomeIcon icon={faFileUpload} />
                    </SendButton>
                    <SendButton>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </SendButton>
                </div>
            </form>
         );
    }
}
 
export default MessengerForm;