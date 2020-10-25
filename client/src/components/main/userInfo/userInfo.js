import React from 'react';
import { Redirect } from 'react-router-dom';
import { setCookie } from '../../../util/cookie';
import { getById } from './../../../api/user.api';
import emptyUser from '../../../assets/images/emptyUser.png';
import { apiUrl } from '../../../config';

import './userInfo.scss';

class UserInfo extends React.Component {
    render() {
        const userAvatar = this.props.image;

        return (
            <div className="user-info">
                <div className="row row_ai-c">
                    <div>
                        <div className="avatar row_jc-c row_ai-c">
                            { userAvatar 
                                ? <img src={userAvatar} className="user" alt="user_avatar" />
                                : <img src={emptyUser} className="empty" alt="emptyUser" />
                            }

                        </div>
                    </div>
                    <h1 className="user-name">
                        {this.props.userName}
                    </h1>
                </div>
            </div>
        );
    }
}

export default UserInfo;