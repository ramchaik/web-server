const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFuZG9tYm9pIiwiYSI6ImNqemQxeHpjbTA4ODAzZG1xNjhsMmpqcG4ifQ.5aEaoGJvfDpu_VJoE8Aw3w&limit=1`;

  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location, try another search.', undefined);
    } else {
      const {
        center: [longitude, latitude],
        place_name: location
      } = features[0];
      callback(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
};

module.exports = geocode;
