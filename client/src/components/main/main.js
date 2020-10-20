import React from 'react';
import { Redirect } from 'react-router-dom';
import { getById } from '../../api/user.api';

class Main extends React.Component {
    state = {  }

    // componentDidMount() {
    //     getById(this.props.userId)
    //         .then(result => console.log(result));
    // }

    render() { 
        getById(this.props.userId)
            .then(result => console.log(result));

        const isAuthenticate = this.props.isAuthenticate;
        const userId = this.props.userId;
        if (!isAuthenticate && userId < 0) return <Redirect from='/' to='/auth' /> 
        console.log(this.props);
        return ( 
            <div className='wrapper'>
                Main
            </div>
        );
    }
}
 
export default Main;