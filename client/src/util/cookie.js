/**
 * Return value of cookie with name
 * 
 * @param {string} name 
 * @returns value or undefined(if matches not found)
 */

function getCookie(name) {
    const r1 = /(?:^|; )/;
    const r2 = /=([^;]*)/; 
    let matches = document.cookie.match(new RegExp(
        r1.source + name.replace(/([.$?*|{}()[\]/+^])/g, /\$1/) + r2.source
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


/**
 * Set cookies from object
 * 
 * @param {Object} obj 
 */
function setCookie(obj) {
    Object.keys(obj).forEach(key => {
        document.cookie = `${key}=${obj[key]}`;
    });
}

export { setCookie, getCookie };