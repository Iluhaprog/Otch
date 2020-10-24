
/**
 * Create FormData from object
 * @param {Object} props 
 */
const formData = props => {
    const data = new FormData();
    for (let key in props) {
        data.append(key, props[key]);
    }
    return data;
}

export {
    formData,
};