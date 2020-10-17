import React from 'react';
import { POST } from '../../util/api';
import { handleChange } from '../../util/forms';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            login: '',
            name: '',
            age: '',
            password: '',
            confrimPassword: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form name='registration' className='form-box' onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="name">
                    <input 
                        type="text" 
                        name="name" 
                        className="form-box__item" 
                        placeholder="Name..."
                        onChange={(e) => handleChange(e, this)}
                        autoComplete='new-password'
                        required
                    />
                </label>
                <label htmlFor="login">
                    <input 
                        type="text" 
                        name="login" 
                        className="form-box__item" 
                        placeholder="Login..."
                        onChange={(e) => handleChange(e, this)}
                        autoComplete='new-password'
                        required
                    />
                </label>
                <label htmlFor="email">
                    <input 
                        type="email" 
                        name="email" 
                        className="form-box__item" 
                        placeholder="Email..."
                        onChange={(e) => handleChange(e, this)}
                        autoComplete='new-password'
                        required
                    />
                </label>
                <label htmlFor="age">
                    <input 
                        type="text" 
                        name="age" 
                        className="form-box__item" 
                        placeholder="Age..."
                        onChange={(e) => handleChange(e, this)}
                        autoComplete='new-password'
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
                        autoComplete='new-password'
                        required
                    />
                </label>
                <label htmlFor="confrimPassword">
                    <input 
                        type="password" 
                        name="confrimPassword" 
                        className="form-box__item" 
                        placeholder="Confrim password..."
                        onChange={(e) => handleChange(e, this)}
                        autoComplete='new-password'
                        required
                    />
                </label>
                <button className="button button_send">
                    Sign Up
                </button>
            </form>
        );
    }
}

export { SignUp };