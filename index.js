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


const app = express();
app.use(express.urlencoded({ extended: false}));
app.use('/', express.static('public'));
app.use('/register', express.static('/register.html'));

//---------------------------------------------Receive data from post function in register.html--------------------------------------//
//--->
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.post('/api/register.html', function(req,res){

    var fullname = req.body.fullname;
    var bankName = req.body.bank_name;
    var bankAccountNumber = req.body.bank_account_number;
    var mobile = req.body.mobile;
    var line_id = req.body.line_id;

    /*console.log(req.body.fullname);
    console.log(req.body.bank_name);
    console.log(req.body.bank_account_number);
    console.log(req.body.mobile);
    console.log(req.body.line_id);*/

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
//--->
//---------------------------------------------End of receive data-----------------------------------------------------//

//--------------------------------------------Send data to Line Notify------------------------------------------//
//--->
const encodeForm = (data) => {
    return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const sendNotify = async function (messageToPush) {
    const token = 'FIl2oBKEB0PdTyE27HSsyrjSmBhAZMcMdVe02Osq2AI'
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
//--->
//--------------------------------------------End of send data to Line Notify--------------------------------//


app.listen(3000, () => console.log("Server is running..."))
