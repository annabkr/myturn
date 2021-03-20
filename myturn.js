const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const args = process.argv.slice(2);
const url = 'https://api.myturn.ca.gov/public/locations/search';

const client = require('twilio')(accountSid, authToken);
const fetch = require("node-fetch");

// default values can be hardcoded here or passed in as command line arguments
let request = {
    cookie: "",
    timeout: 60000,
    duration: 120,
    vaccineData = "",
    toPhone: "",
    fromPhone: "",
    lat: 37.7843234,
    lng: -122.40069,
    fromDate: "2021-03-18",
    doseNumber: 1,
    location: "Moscone"
}

for (i in args) {
    const len = args.length;
    switch (args[i]){
        case '-cookie':
            request.cookie = len > i+1 ? args[i+1] : request.cookie;
        case '-timeout':
            request.timeout = len > i+1 ? args[i+1] : request.timeout;
        case '-vaccineData':
            request.vaccineData = len > i+1 ? args[i+1] : request.vaccineData;
        case '-duration':
            request.duration = len > i+1 ? args[i+1] : request.duration;
        case '-toPhone':
            request.toPhone = len > i+1 ? args[i+1] : request.to;
        case '-fromPhone':
            request.fromPhone = len > i+1 ? args[i+1] : request.from;
        case '-lat':
            request.lat = len > i+1 ? args[i+1] : request.lat;
        case '-lng':
            request.lng = len > i+1 ? args[i+1] : request.lng;
    }
}

const body = {
    "location": {
        "lat": request.lat,
        "lng": request.lng
    },
    "fromDate": request.fromDate,
    "vaccineData": request.vaccineData,
    "locationQuery": {
        "includePools": [
            "default"
        ]
    },
    "doseNumber": request.doseNumber,
    "url": "https://myturn.ca.gov/location-select"
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cookie': cookie,
}

const data = {
    method: "POST",
    body: JSON.stringify(body),
    cookie: cookie,
    headers: headers,
}

const sendMessage = () => {
    client.messages
    .create({
        body: `COVID vaccination appointments may be available at ${request.location}`,
        from: request.fromPhone,
        to: request.toPhone
    })
    .then(message => console.log('Message ID: ', message.sid));
}


const callMyTurn = async (url, cookie, data) => {
    try {
        const response = await fetch(url, data);
        const responseJson = await response.json();

       printLocationsAvailable();
        responseJson.locations.map((location) => {
            console.log(location.name);
            if (location.name.toLowerCase().includes('moscone')){
                sendMessage();
            }
        });
        console.log('------------------------------------------------');
    } catch (e) {
        console.log('Server Error: ', e.toString());
    }
}

const sleep = (ms) =>  new Promise(resolve => setTimeout(resolve, ms));

const printLocationsAvailable = () => {
    console.log('------------------------------------------------');
    console.log('              LOCATIONS AVAILABLE               ');
    console.log('------------------------------------------------');
    const time = Date.now();
    const today = new Date(time);
    console.log(today.toDateString(), today.toTimeString(), '\n');
}
 
const run = async () => {
    let runs = 0;
    while (runs < duration) {
        callMyTurn(url, cookie, data);
        await sleep(timeout); 
        runs += 1;
    }    
}

if (cookie != "") {
    run(url, cookie, data);
}
