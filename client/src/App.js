import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';

import Auth from './components/auth/auth';
import Main from './components/main/main';


function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticate: false,
            userId: getCookie('userId') || -1,
        }
    }

    changeAuthStatus(userId, isAuthenticate) {
        document.cookie = `userId=${userId}`;
        this.setState({
            userId: userId,
            isAuthenticate: isAuthenticate,
        });
    }

    render() {
        return (
            <Router>
                <div className='app'>
                    <Route path='/auth'>
                        <Auth changeAuthStatus={(userId, isAuthenticate) => this.changeAuthStatus(userId, isAuthenticate)} />
                    </Route>
                    <Route exec path='/'>
                        <Main isAuthenticate={this.state.isAuthenticate} userId={this.state.userId} />
                    </Route>
                </div>
            </Router>
        );
    }
}

export { App };