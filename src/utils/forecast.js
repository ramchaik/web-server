const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/a558310554366d069c4c110d14ced015/${latitude},${longitude}?units=si&lang=en`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const {
        currently: { temperature, precipProbability },
        daily: { data: dailyData }
      } = body;
      const msg = `${
        dailyData[0].summary
      } It is currently ${temperature} degrees out. There is ${precipProbability}% chance of rain.`;
      callback(undefined, msg);
    }
  });
};

module.exports = forecast;