//imports
const express = require('express');
require('express-async-errors');
const routes = require('./routes');
//Security imports
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');

//utility imports
const cookieParser = require('cookie-parser');
const { environment } = require('./config');


const isProduction = environment === 'production';

//Express application
const app = express();

//middleware

app.use(morgan('dev')); // security
app.use(cookieParser()); // Parse cookie from headers
app.use(express.json()); // Allows us to use json in req/res


// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// --------- MIDDLE WARES MUST BE USED ABOVE THIS LINE ------


// Routes!!!!
app.use(routes); // Connects all our routes




module.exports = app;