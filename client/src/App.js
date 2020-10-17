import React from 'react';
import { Verification } from './Verification/Verification';
// import { SignIn } from './SignIn/SignIn';
// import { SignUp} from './SignUp/SignUp';

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
                {/* <SignUp /> */}
                <Verification />
            </div>
        );
    }
}

export { App };