const request = require('request')

const geoCode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoiam1lbmdvIiwiYSI6ImNrOHpldmM1ODFzNm4zaW51ZGlpZzJkMnAifQ.JDEyZyYXtEP4LSTpnsnWdQ`
  request({
    url,
    json: true
  }, (err, {
    body
  }) => {
    if (err) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length == 0) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geoCode;