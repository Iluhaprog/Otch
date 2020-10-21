/**
 * Set to component state changed field of form
 * 
 * @param {Object} e event 
 * @param {Object} component react component 
 */
function handleChange(e, component) {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    component.setState({
        [name] : value 
    });
}

export { handleChange };