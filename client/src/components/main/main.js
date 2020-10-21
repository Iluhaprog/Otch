import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './header/header';

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
            <div className='wrapper'>
                <Header 
                    userId={this.props.userId}
                    onSearch={this.setSearchResults.bind(this)}/>
            </div>
        )
    }
}

export default Main;