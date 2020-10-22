import React from 'react';
import { updateAvatar } from '../../../api/user.api';
import { dropHandler, handleDragOver } from '../../../util/dragAndDrop';
import './settings.scss'

class Settings extends React.Component {
    state = {  }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleImageChange(result) {
        this.setState({
            image: result,
        });

        updateAvatar({
            id: this.props.userId,
            formData: this.state.image
        }).then(response => console.log(response));
    }

    render() { 
        return ( 
            <div className="settings">
                <form name="settings" onSubmit={e => this.handleSubmit(e)} className="settings-form">
                    <div className="column column_jc-fs column_ai-c">
                        <div className="row row_jc-c row_ai-c row_fw-w">
                            <div className="settings-form-box">
                                <div className="column column_ai-c">
                                    <div 
                                        className="file" 
                                        onDrop={e => dropHandler(e, this.handleImageChange.bind(this))} 
                                        onDragOver={e => handleDragOver(e)}>
                                            {this.state.image && <img src={this.state.image} alt='user-img' />}
                                    </div>
                                    <div className="column">
                                        <input type="text" name="name" placeholder="Name..."/>
                                        <input type="text" name="login" placeholder="Login..."/>
                                    </div>
                                </div>
                            </div>
                            <div className="settings-form-box">
                                <div className="column column_jc-c column_ai-c">
                                    <h2>Change password</h2>
                                    <input type="password" placeholder="Old password" name="op"/>
                                    <input type="password" placeholder="New password" name="np"/>
                                    <input type="password" placeholder="Confrim new password" name="cnp"/>
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