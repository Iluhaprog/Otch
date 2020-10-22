const handleDragOver = e => {
    e.preventDefault();
}

const dropHandler = (e, callback) => {
    console.log('File');
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0]);
    reader.onload = (e) => {
        e.preventDefault();
        callback(e.target.result);
    }
};

export { dropHandler, handleDragOver };