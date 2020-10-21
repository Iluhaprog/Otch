import { GET } from './../util/api';
import { openWeatherKey } from './../config';

const weatherRequest = (lat, lon, callback) => {
    GET({
        host: 'https://api.openweathermap.org',
        url: '/data/2.5/weather', 
        params: {
            lat: lat,
            lon: lon,
            appid: openWeatherKey,
        }
    })
        .then(response => response.json())
        .then(result => {
            callback(result)
        }) 
}

const convertPosition = (position, callback) => {
    const coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    weatherRequest(coords.lat, coords.lon, callback);
};

const getWeatherByCurrentPosition = (callback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => convertPosition(pos, callback));
    } else {
        console.log('This browser not support geolocation');
    }
}

export {
    getWeatherByCurrentPosition,
};