import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faSearch,faUserCog } from '@fortawesome/free-solid-svg-icons';

import './mobileNav.scss';

class MobileNav extends React.Component {
    state = {
        selected: 1,
    }

    onClick(n) {
        this.setState({selected: n});
    }

    render() {
        const selected = this.state.selected;
        return (
        <nav className='mobile-nav'>
            <div className='row row_jc-sb'>
                <NavLink 
                    to='/search'
                    onClick={() => this.onClick(1)}
                    className={selected === 1 && 'selected'}
                >
                    <FontAwesomeIcon icon={faSearch}/>
                </NavLink>
                <NavLink 
                    to='/chat-list'
                    onClick={() => this.onClick(2)}
                    className={selected === 2 && 'selected'}
                >
                    <FontAwesomeIcon icon={faComment}/>
                </NavLink>
                <NavLink 
                    to='/settings'
                    onClick={() => this.onClick(3)}
                    className={selected === 3 && 'selected'}
                >
                    <FontAwesomeIcon icon={faUserCog}/>
                </NavLink>
            </div>
        </nav>
        );
    }
}

export default MobileNav;