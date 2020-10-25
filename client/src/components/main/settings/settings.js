import React from 'react';
import { updateAvatar, update } from '../../../api/user.api';
import { dropHandler, handleDragOver } from '../../../util/dragAndDrop';
import { handleChange } from '../../../util/forms';

import './settings.scss'

class Settings extends React.Component {
    state = { 
        name: '',
        age: ''
    }

    handleSubmit(e) {
        e.preventDefault();
        update({
            id: this.props.userId,
            name: this.state.name,
            age: this.state.age,
        }).then(result => {
            console.log(result);
        })
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

    render() { 
        return ( 
            <div className="settings">
                <form name="settings" onSubmit={e => this.handleSubmit(e)} className="settings-form">
                    <div className="column column_jc-c column_ai-c sc">
                        <div className="row row_jc-c row_ai-c row_fw-w sr">
                            <div className="settings-form-box">
                                <div className="column column_ai-c">
                                    <div 
                                        className="file" 
                                        onDrop={e => dropHandler(e, this.handleImageChange.bind(this))} 
                                        onDragOver={e => handleDragOver(e)}>
                                            {this.state.image && <img src={this.state.image} alt='user-img' />}
                                    </div>
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
                                </div>
                            </div>
                            <div className="settings-form-box">
                                <div className="column column_jc-c column_ai-c">
                                    <h2>Change password</h2>
                                    {/* <input type="password" placeholder="Old password" name="op"/>
                                    <input type="password" placeholder="New password" name="np"/>
                                    <input type="password" placeholder="Confrim new password" name="cnp"/> */}
                                </div>
                            </div>
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