import React from 'react';
import { addMember, create } from '../../../api/chat.api';
import { dropHandler, handleDragOver } from '../../../util/dragAndDrop';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import FormBox from '../FormBox/FormBox';
import { handleChange } from '../../../util/forms';
import SendButton from '../../buttons/SendButton/SendButton';

import './createChat.scss';
import { withRouter } from 'react-router-dom';

class CreateChat extends React.Component {
    state = { 
        name: '',
        image: '',
        data: new FormData(),
    }

    changeImageHandler(result, formData) {
        this.setState({
            image: result,
            data: formData,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state.data;
        const userId = this.props.userId;
        const wss = this.props.webSocket;
        data.append('name', this.state.name);
        data.append('adminId', this.props.userId);
        create({
            formData: data,
            success: function(e) {
                const response = JSON.parse(e.target.response);
                const req = {
                    adminId: userId,
                    memberId: userId,
                    key: response.data.key,
                };
                addMember(req).then(result => {
                    wss.send(JSON.stringify({userId: userId}));
                });
            },
        });
        this.setState({
            image: '',
            name: '',
            data: new FormData(),
        });
        this.props.history.push('/chat-list');
    }

    onClick(e) {
        const file = e.target.files[0];
        const formData = new FormData() || this.state.data;
        formData.append('avatar', file);

        if (FileReader && file) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    image: fr.result,
                    data: formData
                });
            }
            fr.readAsDataURL(file);
        }
    }

    render() { 
        return ( 
            <form onSubmit={e => this.handleSubmit(e)} className='create-chat-form'>
                <div className='create-chat'>
                    <div className='row row_ai-c row_jc-c'>
                        <FormBox>
                            <DragAndDrop 
                                onDrop={e => dropHandler(e, this.changeImageHandler.bind(this))}
                                onDragOver={e => handleDragOver(e)}
                                onClick={e => this.onClick(e)}
                                image={this.state.image}
                            />
                            <input 
                                type="text" 
                                name="name" 
                                value={this.state.name} 
                                onChange={e => handleChange(e, this)}
                                placeholder="Name..."/>
                            <SendButton text='Create'/>
                        </FormBox>
                    </div>
                </div>
            </form>
        );
    }
}
 
export default withRouter(CreateChat);