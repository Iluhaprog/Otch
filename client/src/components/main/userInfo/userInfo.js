import React from 'react';
import { Redirect } from 'react-router-dom';
import { setCookie } from '../../../util/cookie';
import { getById } from './../../../api/user.api';
import emptyUser from '../../../assets/images/emptyUser.png';
import { apiUrl } from '../../../config';

import './userInfo.scss';

class UserInfo extends React.Component {
    state = {
        userName: '',
        image: '',
        failure: false,
    }

    componentDidMount() {
        getById(this.props.userId)
            .then(result => {
                this.setState({
                    userName: result.data.name,
                    image: apiUrl + result.data.avatar_image,
                })
            })
            .catch(err => {
                this.setState({failure: true})
                setCookie({
                    isAuth: false,
                    userId: -1,
                });
                console.error(err);
            });
    }

    render() {
        if (this.state.failure) return <Redirect to='/auth' />;
        const userAvatar = this.state.image;

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
                        {this.state.userName}
                    </h1>
                </div>
            </div>
        );
    }
}

export default UserInfo;