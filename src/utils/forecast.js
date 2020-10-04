const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=60e5974805121342ccc1967ff6a83b0a&units=metric`;
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.cod !== 200) {
            callback('Unable to find location!', undefined);
        }
        else {
            callback(undefined, `${body.weather[0].description[0].toUpperCase() + body.weather[0].description.slice(1)}. It is currently ${body.main.temp} degrees out. It feels like ${body.main.feels_like} degrees out.`);
        };
    
    });
};

module.exports = forecast;