import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faSearch, faUserCog, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import './mobileNav.scss';

class MobileNav extends React.Component {
    state = {
        selected: 2,
    }

    onClick(n, title, button) {
        this.setState({selected: n});
        this.props.changeTopBar({
            title: title,
            button: button || {
                inner: {},
                location: '',
            }
        });
    }

    render() {
        const selected = this.state.selected;
        const button = {
            inner: faPlusSquare,
            location: '/create-chat'
        }
        return (
        <nav className='mobile-nav'>
            <div className='row row_jc-sb'>
                <NavLink 
                    to='/search'
                    onClick={() => this.onClick(1, 'Find users')}
                    className={selected === 1 ? 'selected' : ''}
                >
                    <FontAwesomeIcon icon={faSearch}/>
                </NavLink>
                <NavLink 
                    to='/chat-list'
                    onClick={() => this.onClick(2, 'Chats', button)}
                    className={selected === 2 ? 'selected' : ''}
                >
                    <FontAwesomeIcon icon={faComment}/>
                </NavLink>
                <NavLink 
                    to='/settings'
                    onClick={() => this.onClick(3, 'Settings')}
                    className={selected === 3 ? 'selected' : ''}
                >
                    <FontAwesomeIcon icon={faUserCog}/>
                </NavLink>
            </div>
        </nav>
        );
    }
}

export default MobileNav;