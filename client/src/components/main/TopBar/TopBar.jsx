import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './topBar.scss';

export default props => {
    const topbar = props.data;
    return (
        <div className='top-bar'>
            <div className={topbar.button.location ? 'row row_jc-sb' : 'row row_jc-c'}>
                { 
                    topbar.button.location
                        ? 
                        <NavLink to={topbar.button.location || ''} onClick={topbar.button.onClick}>
                            <FontAwesomeIcon icon={topbar.button.inner} />
                        </NavLink>
                        : 
                        ''
                }
                <p>{topbar.title}</p>
            </div>
        </div>
    )
}