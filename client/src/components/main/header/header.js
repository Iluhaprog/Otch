import React from 'react';
import SearchForm from '../search/search';
import UserInfo from '../userInfo/userInfo';
import Weather from '../weather/weather';
import IconButton from '../../buttons/IconButton/IconButton';
import {faSlidersH, faDoorClosed} from '@fortawesome/free-solid-svg-icons';

import './header.scss';

class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <div className="row row_ai-c row_jc-sb">
                    <UserInfo userId={this.props.userId} />
                    <SearchForm onSearch={this.props.onSearch}/>
                    <Weather />
                    <div className="header__buttons-box row row_ai-c">
                        <IconButton icon={faSlidersH} onClick={() => console.log('sl') } />
                        <IconButton icon={faDoorClosed} onClick={() => this.props.onLogout()} />
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;