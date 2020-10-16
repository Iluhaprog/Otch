import React from 'react';
import { SignIn } from './SignIn/SignIn';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticate: false
        }
    }

    render() {
        return (
            <div className='app'>
                <SignIn />
            </div>
        );
    }
}

export { App };