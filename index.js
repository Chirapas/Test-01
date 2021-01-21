const express = require('express');
const path = require('path');
const cookiesSession = require('cookie-session');
const bcrypt = require('bcrypt');
//const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bodyParser = require('body-parser');
const webpush = require('web-push');
const axios = require('axios');
//-------------------------------------------Web-Push-Test--------------------------------------------------------//
/*app.use(bodyParser.json());

const publicVapidKey = 'BIKmdXDAM2y57fNTlpmBb3UrAojmeNeybuWXCARoXEyHtdJ2CgQjjebQ77ww4jfTbD_K_sKOVD6gL1xfe7aKn4M';
const privateVapidKey = 'HWV89-7CzwEy_fGrdxHbuw3ftluBm7Lwi3hW8vM3aFU';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);*/
//------------------------------------------End-of-Web-Push-Test--------------------------------------------------//


const app = express();
app.use(express.urlencoded({ extended: false}));
app.use('/', express.static('public'));
app.use('/register', express.static('/register.html'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.post('/api/register.html', function(req,res){

    //console.log(req.body.register_firstname);

    var fullname = req.body.fullname;
    var bankName = req.body.bank_name;
    var bankAccountNumber = req.body.bank_account_number;
    var mobile = req.body.mobile;
    var line_id = req.body.line_id;

    console.log(req.body.fullname);
    console.log(req.body.bank_name);
    console.log(req.body.bank_account_number);
    console.log(req.body.mobile);
    console.log(req.body.line_id);

    if (fullname != '' && bankName != '' && bankAccountNumber != '' && mobile != '' && line_id != '') {
        var formRegister ='\r\n' + 'ชื่อ : ' + fullname + '\r\n';
        formRegister += 'ธนาคาร : ' + bankName + '\r\n';
        formRegister += 'เลข บ/ช : ' + bankAccountNumber + '\r\n';
        formRegister += 'เบอร์โทรศัพท์ : ' + mobile + '\r\n';
        formRegister += 'LINE ID : ' + line_id + '\r\n';
        sendNotify(formRegister);
        res.sendStatus(200);
    } else {
        res.sendStatus(406);
    }
});

const encodeForm = (data) => {
    return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const sendNotify = async function (messageToPush) {
    const token = 'RKTMoPshlafEyRnRVtzF7SndYGLcjnwDh7MuKfchjbN'
    const url = 'https://notify-api.line.me/api/notify'
  
    const requestData = {
        message: '' + messageToPush
    }
  
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        }
    }
  
    axios.post(url, encodeForm(requestData), config)
    .then(response => {})
    .catch(error => {})
}

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
