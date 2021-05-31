const args = process.argv.slice(2);
const len = args.length;

// default values can be hardcoded here or passed in as command line arguments
let params = {
    cookie: "",
    timeout: 60000,
    duration: 120,
    vaccineData: "",
    toPhone: "",
    fromPhone: "",
    lat: 37.7843234,
    lng: -122.40069,
    fromDate: "2021-03-18",
    doseNumber: 1,
    location: "Moscone"
}

export function getParams(){
    return params
}

export function setArguments() {
    const params = getParams()
    for (i in args) {
        switch (args[i]){
            case '-cookie':
                cookie = validateParam(args, i, params.cookie);
                setCookie(cookie);
            case '-timeout':
                timeout = validateParam(args, i, params.timeout);
                setTimeoutField(timeout);
            case '-vaccineData':
                vaccineData = validateParam(args, i, params.vaccineData);
                setVaccineData(vaccineData);
            case '-duration':
                duration = validateParam(args, i, params.duration);
                setDuration(duration);
            case '-toPhone':
                toPhone = validateParam(args, i, params.to);
                setToPhone(toPhone);
            case '-fromPhone':
                fromPhone = validateParam(args, i, params.from);
                setFromPhone(fromPhone);
            case '-lat':
                latitude = validateParam(args, i, params.lat);
                setLatitude(latitude);
            case '-lng':
                longitude = validateParam(args, i, params.lng)
                setLongitude(longitude);
        }
    }
}

export function getBody(){
    const params = getParams();
    return {
        "location": {
            "lat": params.lat,
            "lng": params.lng
        },
        "fromDate": params.fromDate,
        "vaccineData": params.vaccineData,
        "locationQuery": {
            "includePools": [
                "default"
            ]
        },
        "doseNumber": params.doseNumber,
        "url": "https://myturn.ca.gov/location-select"
    }
}

export function getHeaders(){
    const params = getParams();
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': params.cookie,
    }
}

export function getRequestBody(){
    const body = getBody();
    const params = getParams();
    const headers = getHeaders();
    return {
        method: "POST",
        body: JSON.stringify(body),
        cookie: params.cookie,
        headers: headers,
    }
}


function validateParam(args, i, fallthrough){
    return len > i+1 ? args[i+1] : fallthrough;
}

function setCookie(cookie){
   params.cookie = cookie;
}

function setTimeoutField(timeout){
    params.timeout = timeout;
}

function setVaccineData(vaccineData){
    params.vaccineData = vaccineData;
}

function setDuration(duration) {
    params.duration = duration;
}

function setToPhone(toPhone){
    params.to = toPhone;
}

function setFromPhone(fromPhone){
    params.fromPhone = fromPhone;
}

function setLatitude(latitude){
    params.lat = latitude;
}

function setLongitude(longitude){
    params.lng = longitude;
}