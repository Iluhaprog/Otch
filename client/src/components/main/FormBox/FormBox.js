import React from 'react';
import './formBox.scss';

export default props => {
    return (
        <div className="form-block">
            <div className="column column_ai-c">
                {props.children}
            </div>
        </div>
    );
};