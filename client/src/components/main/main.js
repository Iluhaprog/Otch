import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
        if (!this.props.isAuth) return <Redirect to='/auth' />

        return (
            <div className='wrapper wrapper_main'>
                <Header
                    userId={this.props.userId}
                    userName={this.props.userData.userName}
                    image={this.props.userData.image}
                    onSearch={this.setSearchResults.bind(this)}
                    onLogout={this.props.onLogout}
                />
                <div></div>
                <Switch>
                    <Route path='/settings'>
                        <Settings
                            userId={this.props.userId}
                            onUpdate={this.props.updateUser}
                            name={this.props.userData.userName}
                            age={this.props.userData.age}
                        />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default Main;