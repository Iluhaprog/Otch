import React, { useRef } from 'react';
import './dragAndDrop.scss';

export default props => {
    const fileChoise = useRef(null);

    const handleClick = () => {
        fileChoise.current.click();
    };

    const onChange = (e) => {
        props.onClick(e);
    }

    return (
        <div 
            className="file" 
            onDrop={props.onDrop} 
            onDragOver={props.onDragOver}
            onClick={handleClick}
            onTouchStart={handleClick}>
                {props.image && <img src={props.image} alt={props.image} />}
                <input
                    ref={fileChoise}
                    type='file'
                    style={{display: 'none'}}
                    onChange={onChange}
                />
        </div>
    );
}