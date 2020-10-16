import React from 'react';
import { SignIn } from './SignIn/SignIn';
import { SignUp} from './SignUp/SignUp';

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
                {/* <SignIn /> */}
                <SignUp />
            </div>
        );
    }
}

export { App };