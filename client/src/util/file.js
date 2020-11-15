
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

/**
 * Get type of file 
 * @param {*} path 
 */
const getFileType = path => {
    const ext = path && path.split('.');
    return (ext && ext[ext.length - 1]);
}

export {
    formData,
    getFileType,
};