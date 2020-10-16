import React from 'react';
import base64 from 'base-64';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        };
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value 
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('https://localhost:3000/users/login',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${base64.encode(`${this.state.login}:${this.state.password}`)}`,
                },
                body: {
                    'grant_type': 'password'
                },
            })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(err => console.error(err));
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
                        onChange={(e) => this.handleChange(e)} 
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
                        onChange={(e) => this.handleChange(e)} 
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