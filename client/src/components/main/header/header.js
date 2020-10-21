import React from 'react';
import UserInfo from '../userInfo/userInfo';
import './header.scss';

class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <div className="row row_ai-c row_jc-sb">
                    <UserInfo userId={this.props.userId} />
                </div>
            </header>
        )
    }
}

export default Header;