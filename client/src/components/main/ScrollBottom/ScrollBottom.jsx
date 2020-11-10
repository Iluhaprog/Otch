import React, {useEffect} from 'react';

export default props => {
    let bottomElement = {};
    const scrollToBottom = (element) => {
        element.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom(bottomElement);
    });
    return (
        <div ref={el => bottomElement = el}></div>
    )
}