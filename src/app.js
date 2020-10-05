const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const  viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'Welcome on help page.',
        name: 'Andrew Mead'
    })
});

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('*/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        message: 'Help article not found'
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        message: 'Page not found.'
    });
});

app.listen(port, () =>{
    console.log('Server is up on port ' + port);
});