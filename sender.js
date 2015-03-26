module.exports = function(app,custom,client) {
    app.get('/send', function(req, res) {

        // Check referer against whitelist
        var referer = req.get('Referer')
        if(custom.clientWhitelist.indexOf(referer) === -1) {
            res.status(401).send('Unauthorized')
            return
        }

        var name = req.query.name
        var phone = req.query.phone
        phone = (phone?phone.replace(/\D/g, ''):'') // Remove everything but digits

        // Do validation
        if(!name) {
            // name is null, undefined, empty, etc
            console.log('undefined name')
            res.jsonp({status:400, error:'Invalid name'})
        } else if(phone.length < 10 && phone.length !== 7) {
            // phone number isn't working out
            console.log('invalid phone number')
            res.jsonp({status:400, error:'Invalid phone number'})
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
                if(err) {
                    console.log("err: " + JSON.stringify(err))
                    res.jsonp({status:400, error:err.message})
                } else {
                    console.log("message sent: " + message.sid)
                    res.jsonp({status:200, message:'sent'})
                }
            })

        }
    })
}
