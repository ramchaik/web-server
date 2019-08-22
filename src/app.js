const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Vaibhav Singh'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Vaibhav Singh'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Vaibhav',
    message:
      'Hello guys , welcome to the help page. Today I am going to tell you what is meant by help, to help is to restrict a message.'
  });
});

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Great weather.',
    location: 'Bangalore'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Vaibhav',
    errorMsg: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Vaibhav',
    errorMsg: 'Page not found'
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000....');
});
