import React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../../../api/user.api';
import { handleChange } from '../../../util/forms';
import SendButton from '../../buttons/SendButton/SendButton';
import './login.scss';

class Login extends React.Component {
    state = {
        login: '',
        password: '',
    }

    handleSubmit(e) {
        e.preventDefault();
        login({ login: this.state.login, password: this.state.password })
            .then(result => {
                if (result.status === 1) {
                    this.props.changeAuth(true, result.data.userId);
                }
            })
            .catch(err => console.error(err));
    }

    render() {
        const visible = this.props.visible ? 'form-box__visible' : '';
        return (
            <form name='login' className={`form-box ${visible}`} onSubmit={e => this.handleSubmit(e)}>
                <div className='column column_jc-c'>
                    <label htmlFor="login">
                        <input
                            type="text"
                            name="login"
                            className="form-box__item"
                            placeholder="Email or Login..."
                            onChange={e => handleChange(e, this)}
                            autoComplete='username'
                            required />
                    </label>
                    <label htmlFor="password">
                        <input
                            type="password"
                            name="password"
                            className="form-box__item"
                            placeholder="Password..."
                            onChange={e => handleChange(e, this)}
                            autoComplete='new-password'
                            required />
                    </label>
                    <SendButton text="SingIn" />
                    <a href="#" className='link'>
                        Forgot password
                </a>
                </div>
            </form>
        )
    }
}

export default Login;