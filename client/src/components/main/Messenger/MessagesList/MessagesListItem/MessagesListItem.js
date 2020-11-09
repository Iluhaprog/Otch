import React from 'react';

export default props => {
    return (
        <li>
            <div className="message-box">
                <div className="sender-name">
                    <p>
                        Name
                        {/* {props.senderName} */}
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