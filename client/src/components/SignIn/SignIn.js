import React from 'react';
import base64 from 'base-64';
import { handleChange } from '../../util/forms';
import { POST } from '../../util/api';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form name='signin' onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="login">
                    <input 
                        type="text" 
                        name="login" 
                        className="form-box__item" 
                        placeholder="Email or Login..." 
                        onChange={(e) => handleChange(e, this)} 
                        value={this.state.login} 
                        required
                    />
                </label>
                <label htmlFor="password">
                    <input 
                        type="password" 
                        name="password" 
                        className="form-box__item" 
                        placeholder="Password..." 
                        onChange={(e) => handleChange(e, this)} 
                        value={this.state.password} 
                        required
                    />
                </label>
                <button className="button button_send">
                    Sign In
                </button>
            </form>
        );
    }
}

export { SignIn };