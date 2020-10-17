import React from 'react';
import { Verification } from './components/Verification/Verification';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp} from './components/SignUp/SignUp';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticate: false,
            userId: -1,
        }
    }

    render() {
        return (
            <div className='app'>
                <SignIn />
                <hr />
                <SignUp />
                <hr />
                <Verification />
            </div>
        );
    }
}

export { App };