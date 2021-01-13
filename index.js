const express = require('express');
const path = require('path');
const cookiesSession = require('cookie-session');
const bcrypt = require('bcrypt');
//const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');
const router = express.Router();

/*router.get('/', (req, res) => {
    console.log('Request for register page recieved.');
    res.render('register');
});

module.exports = router;*/

const app = express();
app.use(express.urlencoded({ extended: false}));
app.use('/', express.static('public'));
app.use('/register', express.static('/register.html'));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.get('/', (req, res) => res.render('register'));
//Callback Register Page
/*app.get('/register', function (req, res){
    res.render('register', {});
});
//Callback Login Page
app.get('/login', function (req, res){
    res.render('login', {});
});*/



/*app.use(cookiesSession({
    name: 'session',
    keys: ['key1','key2'],
    maxAge: 3600 * 1000 //1hr
}))

//Declaring custom Middleware
const ifNotLoggedIn  = (req, res, next) => {
    if (!req.session.isLoggedIn){
        return res.render('login');
    }
    next();
}*/

//root page
/*app.get('/', ifNotLoggedIn, (req, res, next)=>{
    dbConnection.execute("SELECT name FROM users WHERE id = ?", [req.session.userID])
    .then(([row]) => {
        res.render('home', {
            name: rows[0].name
        })
    })
})*/

app.listen(3000, () => console.log("Server is running..."))
