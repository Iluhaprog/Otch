import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getCookie, setCookie } from './util/cookie';
import Auth from './components/auth/auth';
import Main from './components/main/main';
import { logout, getById } from './api/user.api';
import { apiUrl } from './config';

import './App.scss';


class App extends React.Component {
    state = {
        isAuth: getCookie('isAuth') === 'true' || false,
        userId: getCookie('userId') || -1,
        userName: '',
        image: '',
        age: 0,
    }

    handleAuth(isAuth, userId) {
        const obj = {
            isAuth: isAuth,
            userId: userId,
        };
        this.setState(obj);
        setCookie(obj);
        this.updateUser();
    }

    componentDidMount() {
        if(this.state.isAuth) {
            this.updateUser();
        }
    }

    updateUser() {
        getById(this.state.userId)
            .then(result => {
                this.setState({
                    userName: result.data.name,
                    image: result.data.avatar_image && (apiUrl + result.data.avatar_image),
                    age: result.data.age,
                });
            })
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
        const user = {
            userName: this.state.userName,
            image: this.state.image,
            age: this.state.age,
        };
        return (
            <Router>
                <div className='app'>
                    <Route path='/'>
                        <Auth isAuth={this.state.isAuth} changeAuth={this.handleAuth.bind(this)} />
                    </Route>
                    <Route path='/'>
                        <Main 
                            userData={user}
                            isAuth={this.state.isAuth} 
                            userId={this.state.userId} 
                            updateUser={this.updateUser.bind(this)}
                            onLogout={() => this.logout()}/>
                    </Route>
                </div>
            </Router>
        );
    }
}

export { App };