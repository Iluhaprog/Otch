import React from 'react';
import { getWeatherByCurrentPosition } from '../../../api/weather.api';
import { toCelsius } from './../../../util/math';

import './weather.scss';

class Weather extends React.Component {
    state = { 
        temperature: '',
        img: '',
    }

    componentDidMount() {
        getWeatherByCurrentPosition(result => {
            this.setState({
                temperature: toCelsius(result.main.temp),
                img: `http://openweathermap.org/img/wn/${result.weather[0].icon}.png`,
            });
        });
    }

    render() { 
        return ( 
            <div className="weather-box">
                <div className="weather-box-inner">
                    <div className="row row_ai-c">
                        <p>{this.state.temperature} ℃</p>
                        <img src={this.state.img} alt="weather"/>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Weather;