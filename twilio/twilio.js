const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken); 

const sendMessage = () => {
    request = getRequest();
    client.messages
    .create({
        body: `COVID vaccination appointments may be available at ${request.location}`,
        from: request.fromPhone,
        to: request.toPhone
    })
    .then(message => console.log('Message ID: ', message.sid));
}
