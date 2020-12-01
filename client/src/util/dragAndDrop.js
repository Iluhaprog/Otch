import { formData } from './file';

const handleDragOver = e => {
    e.preventDefault();
}

const dropHandler = (e, callback) => {
    console.log(e.dataTransfer.files[0]);
    e.preventDefault();
    const imageData = formData({
        'avatar':  e.dataTransfer.files[0],
    });
    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0]);
    reader.onload = (e) => {
        e.preventDefault();
        callback(e.target.result, imageData);
    }
};

export { dropHandler, handleDragOver };