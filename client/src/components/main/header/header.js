import React from 'react';
import SearchForm from '../search/search';
import UserInfo from '../userInfo/userInfo';
import Weather from '../weather/weather';
import './header.scss';

class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <div className="row row_ai-c row_jc-sb">
                    <UserInfo userId={this.props.userId} />
                    <SearchForm onSearch={this.props.onSearch}/>
                    <Weather />
                </div>
            </header>
        )
    }
}

export default Header;