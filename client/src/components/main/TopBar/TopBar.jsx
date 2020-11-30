import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './topBar.scss';

export default props => {
    const topbar = props.data;
    return (
        <div className='top-bar'>
            <div className={topbar.button.location ? 'row row_jc-sb' : 'row row_jc-c'}>
                <p>{topbar.title}</p>
                { 
                    topbar.button.location
                        ? 
                        <NavLink to={topbar.button.location || ''}>
                            <FontAwesomeIcon icon={topbar.button.inner} />
                        </NavLink>
                        : 
                        ''
                }
            </div>
        </div>
    )
}