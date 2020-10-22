import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './header/header';
import Settings from './settings/settings';

class Main extends React.Component {
    state = {
        searchResults: [],
    }

    setSearchResults(results) {
        this.setState({
            searchResults: results,
        });
    }

    render() {
        if (!this.props.isAuth) return <Redirect to='/auth'/>
        console.log(this.state);
        return (
            <div className='wrapper wrapper_main'>
                <Header 
                    userId={this.props.userId}
                    onSearch={this.setSearchResults.bind(this)}
                    onLogout={this.props.onLogout}
                    />
                <div></div>
                <Settings userId={this.props.userId}/>
            </div>
        )
    }
}

export default Main;