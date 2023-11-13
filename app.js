const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');

const authController = require('./src/controllers/api/auth.controller');

/**
 * Create Express.js app
 */
const app = express();


/**
 * Express.js basic setups
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
console.log(path.join(__dirname, 'src/public'))
app.use('/public', express.static(path.join(__dirname, 'src/public')));

app.use(passport.initialize());
//app.use(passport.session());
require('./src/config/passport/local.js')(passport);

/**
 * Database connection
 */
mongoose
    .connect(
        process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('Connected to the MongoDB database'))
    .catch(err => {
        console.log(err)
        process.exit();
    });



/**
 * Routes setup
 */
const apiRouter = require('./src/routes/api.router.js');


app.use('/api', apiRouter);
app.use('/login', authController.LOGIN)
app.use('/register', authController.REGISTER)


/**
 * Error handler
 */
//Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;