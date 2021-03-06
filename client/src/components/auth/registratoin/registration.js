import React from 'react';
import { Redirect } from 'react-router-dom';
import { registration } from '../../../api/user.api';
import { handleChange } from '../../../util/forms';
import SendButton from '../../buttons/SendButton/SendButton';

class Registration extends React.Component {
    state = { 
        name: '',
        login: '',
        email: '',
        password: '',
        confrimPassword: '',
        success: false,
    }

    handleSuccess() {
        this.setState({
            success: true
        });
    }

    handleFail(status) {
        switch(status) {
            case 2:
                this.setState({failMessage: 'Email exist'})
                break;
            case 3:
                this.setState({failMessage: 'Login exist'})
                break;
            default:
                break;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { password, confrimPassword } = this.state;
        if (password === confrimPassword) {
            registration(this.state)
                .then(result => {
                    if (result.status === 1) {
                        this.props.changeUserId(result.data.userId);
                        this.handleSuccess();
                    } else {
                        this.handleFail(result.status);
                    }
                })
                .catch(err => console.error(err));
        } else {
            this.setState({failMessage: 'Passwords do not match'})
        }
    }

    render() { 
        const visible = this.props.visible ? 'form-box__visible' : ''; 
        const failMessage = this.state.failMessage; 

        if (this.state.success) return <Redirect from='/auth' to='/verification'/>
        
        return ( 
            <form name='registration' className={`form-box ${visible}`} onSubmit={e => this.handleSubmit(e)}>
                <h4 className='error'>{failMessage}</h4>
                <label htmlFor="name">
                    <input 
                        type="text"
                        name="name"
                        className="form-box__item"
                        onChange={e => handleChange(e, this)}
                        placeholder="Name..." 
                        required />
                </label>
                <label htmlFor="login">
                    <input 
                        type="text"
                        name="login"
                        className="form-box__item"
                        onChange={e => handleChange(e, this)}
                        placeholder="Login..."
                        required />
                </label>
                <label htmlFor="email">
                    <input 
                        type="email"
                        name="email"
                        className="form-box__item"
                        onChange={e => handleChange(e, this)}
                        placeholder="Email..."
                        autoComplete='username'
                        required />
                </label>
                <label htmlFor="age">
                    <input 
                        type="text"
                        name="age"
                        className="form-box__item"
                        onChange={e => handleChange(e, this)}
                        placeholder="Age..."
                        required />
                </label>
                <label htmlFor="password">
                    <input 
                        type="password"
                        name="password"
                        className="form-box__item"
                        onChange={e => handleChange(e, this)}
                        placeholder="Password..." 
                        autoComplete='new-password'
                        required />
                </label>
                <label htmlFor="confrimPassword">
                    <input 
                        type="password"
                        name="confrimPassword"
                        className="form-box__item"
                        onChange={e => handleChange(e, this)}
                        placeholder="Confrim pssword..."
                        autoComplete='new-password'
                        required />
                </label>
                <SendButton text="SignUp"/>
            </form>
        );
    }
}
 
export default Registration;