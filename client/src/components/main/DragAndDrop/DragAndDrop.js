import React from 'react';
import './dragAndDrop.scss';

export default props => {
    return (
        <div 
            className="file" 
            onDrop={props.onDrop} 
            onDragOver={props.onDragOver}>
                {props.image && <img src={props.image} alt={props.image} />}
        </div>
    );
}