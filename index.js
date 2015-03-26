var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var custom = require('./custom')
var client = require('twilio')(custom.accountSid, custom.authToken)

app.get('/', function(req, res) {
    console.log('/')
    res.send('hi')
})

app.get('/send', function(req, res) {
    console.log(req.query)
    var name = req.query.name
    var phone = req.query.phone
    phone = (phone?phone.replace(/\D/g, '').trim():'')

    if(!name) {
        // name is null, undefined, empty, etc
        console.log('undefined name')
        res.status(406).jsonp({success:false, message:'Please enter your name'})
    } else if(phone.length < 10 &&  phone.length !== 7) {
        // phone number isn't working out
        console.log('invalid phone number')
        res.status(406).jsonp({success:false, message:'Please enter a valid phone number'})
    } else {
        // All valid
        if(phone.length > 10) // assuming full number already
            phoneString = '+' + phone
        if(phone.length === 10) // assuming US number
            phoneString = '+1' + phone
        if(phone.length === 7) // assuming phone in default area code
            phoneString = "+1" + custom.defaultAreaCode + phone

            client.messages.create({
                body: "Hey " + name + "!",
                to: phoneString,
                from: custom.from
            }, function(err, message) {
                console.log(message.sid)
            })

            // 200, swag on you
            res.status(200).jsonp({success:true, message:'yay'})
    }
})

app.listen(3002)
console.log('Listening on 3002')
