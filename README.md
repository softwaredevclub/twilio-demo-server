# UHS Hack Club Twilio Demo: Server
By [Nicholas Egan](https://github.com/egansoft)  
Made with Twilio, node.js, and magic

## Setup
1. Create a [Twilio account](https://www.twilio.com/try-twilio)

2. Create a file in the root directory called custom.js with the following contents:

```javascript
module.exports = {
    accountSid: "(your Twilio account sid)",
    authToken: "(your Twilio auth token)",
    from: "(your Twilio phone number)",
    defaultAreaCode: "(default area code)",
    clientUrl: "(where your client is)",
    clientWhitelist: ["(list of)","(domains that can)","(access your API)"],
    port: (port to run the server on)
}

```

## Usage
See UHS Twilio demo [client](https://github.com/softwaredevclub/twilio-demo-client)
