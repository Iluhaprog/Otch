import React from 'react';

export default props => {
    const right = parseInt(props.memberId) === parseInt(props.userId) ? '' : 'r';
    return (
        <li>
            <div className={`message-box ${right}`}>
                <div className='sender-name'>
                    <p>
                        {props.senderName}
                    </p>
                </div>
                <div className="message-text">
                    <p>
                        {props.message}
                    </p>
                </div>
            </div>
        </li>
    );
}