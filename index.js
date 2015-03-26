var app = require('express')()
var custom = require('./custom')
var client = require('twilio')(custom.accountSid, custom.authToken)

// Sender: Sends a greeting to the phone number given
// GET: /send
require('./sender')(app,custom,client)

// Receiver: Receives a message and responds
// GET: /receive
// require('./receiver')(app)

// Redirect to sender client on github pages
app.get('/', function(req, res) {
    console.log('/')
    res.redirect(custom.clientUrl)
})

app.listen(custom.port)
console.log('Listening on ' + custom.port + '...')
