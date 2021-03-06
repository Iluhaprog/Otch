import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TabButton from '../buttons/TabButton/TabButton';
import Verification from '../verification/Verification';
import Login from './login/login';
import Registration from './registratoin/registration';
import './auth.scss';

class Auth extends React.Component {
    state = {
        userId: '',
        visibleTab: 1,
    };

    changeVisibleTab(tab) {
        this.setState({
            visibleTab: tab,
        });
    }

    changeUserId(id) {
        this.setState({
            userId: id
        });
    }

    render() {
        const visibleTab = this.state.visibleTab;

        if (this.props.isAuth) return <Redirect to='/chat-list'/>;

        return (
            <div className="wrapper row row_jc-c row_ai-c">
                <Route path='/auth'>
                    <div className="tabs-box">
                        <nav className='tabs-nav row row_jc-sb'>
                            <TabButton text='SignIn' selected={visibleTab === 1} click={() => this.changeVisibleTab(1)} />
                            <TabButton text='SingUp' selected={visibleTab === 2} bl={true} click={() => this.changeVisibleTab(2)} />
                        </nav>
                        <div className="tabs">
                            <Login visible={visibleTab === 1} changeAuth={this.props.changeAuth}/>
                            <Registration visible={visibleTab === 2} changeUserId={(id) => this.changeUserId(id)} />
                        </div>
                    </div>
                </Route>
                <Route path='/verification'>
                    <div className="tabs-box">
                        <div className="tabs">
                            <Verification userId={this.state.userId} />
                        </div>
                    </div>
                </Route>
            </div>
        );
    }
}

export default Auth;