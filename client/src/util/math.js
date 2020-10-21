/**
 * Convert kelvin to celsius
 * 
 * @param {number} t 
 * @returns number
 */
const toCelsius = t => Math.floor(t - 273.15);

export {
    toCelsius,
};