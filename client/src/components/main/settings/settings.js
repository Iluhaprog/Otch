import React from 'react';
import { updateAvatar, update, updatePassword } from '../../../api/user.api';
import { dropHandler, handleDragOver } from '../../../util/dragAndDrop';
import { handleChange } from '../../../util/forms';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import FormBox from '../FormBox/FormBox';

import './settings.scss'

class Settings extends React.Component {
    state = { 
        name: this.props.name,
        age: this.props.age,
        oldPassword: '',
        newPassword: '',
        cnewPassword: '',
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newPassword === this.state.cnewPassword) {
            update({
                id: this.props.userId,
                name: this.state.name,
                age: this.state.age,
            }).then(result => {
                this.props.onUpdate();
            });
            if(this.state.oldPassword && this.state.cnewPassword) {
                updatePassword({
                    id: this.props.userId,
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                }).then(result => console.log(result));
            }
        }
    }

    handleImageChange(result, formData) {
        this.setState({
            image: result,
        });

        updateAvatar({
            id: this.props.userId,
            formData: formData,
        });
    }

    handleClick(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);

        if (FileReader && file) {
            let fr = new FileReader();
            fr.onload = () => {
                this.setState({
                    image: fr.result,
                });
            }
            fr.readAsDataURL(file);
        }

        updateAvatar({
            id: this.props.userId,
            formData: formData,
        });
    }

    render() { 
        return ( 
            <div className="settings">
                <form name="settings" onSubmit={e => this.handleSubmit(e)} className="settings-form">
                    <div className="column column_jc-c column_ai-c sc">
                        <div className="row row_jc-c row_ai-c row_fw-w sr">
                            <FormBox>
                                <DragAndDrop
                                    onDrop={e => dropHandler(e, this.handleImageChange.bind(this))} 
                                    onDragOver={e => handleDragOver(e)}
                                    image={this.state.image}
                                    onClick={this.handleClick.bind(this)}
                                    />
                                <div className="column">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={this.state.name} 
                                        onChange={e => handleChange(e, this)}
                                        placeholder="Name..."/>
                                    <input 
                                        type="text" 
                                        name="age" 
                                        value={this.state.age} 
                                        onChange={e => handleChange(e, this)}
                                        placeholder="Age..."/>
                                </div>
                            </FormBox>
                            <FormBox>
                                <h2>Change password</h2>
                                <input 
                                    type="password" 
                                    placeholder="Old password"
                                    value={this.state.oldPassword}
                                    onChange={e => handleChange(e, this)} 
                                    name="oldPassword"/>
                                <input 
                                    type="password" 
                                    placeholder="New password"
                                    value={this.state.newPassword}
                                    onChange={e => handleChange(e, this)} 
                                    name="newPassword"/>
                                <input 
                                    type="password" 
                                    placeholder="Confrim new password"
                                    value={this.state.cnewPassword}
                                    onChange={e => handleChange(e, this)} 
                                    name="cnewPassword"/>
                            </FormBox>
                        </div>
                        <button className="button button_send">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default Settings;