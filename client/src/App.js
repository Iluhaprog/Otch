import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getCookie, setCookie } from './util/cookie';
import './App.scss';

import Auth from './components/auth/auth';
import Main from './components/main/main';
import { logout, getById } from './api/user.api';


class App extends React.Component {
    state = {
        isAuth: getCookie('isAuth') === 'true' || false,
        userId: getCookie('userId') || -1,
    }

    handleAuth(isAuth, userId) {
        const obj = {
            isAuth: isAuth,
            userId: userId,
        };
        this.setState(obj);
        setCookie(obj);
    }

    logout() {
        logout()
            .then(result => {
                if (result.logout) {
                    this.handleAuth(false, -1);
                }
            });
    }

    render() {
        return (
            <Router>
                <div className='app'>
                    <Route path='/auth'>
                        <Auth isAuth={this.state.isAuth} changeAuth={this.handleAuth.bind(this)} />
                    </Route>
                    <Route exec path='/'>
                        <Main 
                            isAuth={this.state.isAuth} 
                            userId={this.state.userId} 
                            onLogout={() => this.logout()}/>
                    </Route>
                </div>
            </Router>
        );
    }
}

export { App };