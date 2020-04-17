const request = require('request')

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7df3ea6797f8274e162446f06ca704f9&query=${lat},${lon}`
  request({
    url,
    json: true
  }, (err, {
    body
  }) => {
    if (err) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      console.log(body.error)
      callback('Unable to find weather information for this location', undefined)
    } else {
      const currentWeather = body.current;
      const {
        temperature,
        precip,
        weather_descriptions,
        feelslike
      } = currentWeather
      callback(undefined, {
        temperature,
        probabilityRain: precip,
        description: weather_descriptions[0],
        feelslike
      })
    }
  })
}

module.exports = forecast