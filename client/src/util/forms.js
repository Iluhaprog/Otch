function handleChange(e, component) {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    component.setState({
        [name] : value 
    });
}

export { handleChange };