import { getRequestBody } from "../utils/utils.js";
import fetch from 'node-fetch';

export const callMyTurn = async (url) => {
    const request = getRequestBody();
    try {
        const response = await fetch(url, request);
        const responseJson = await response.json();
        const time = Date.now();
        const today = new Date(time);

       printAvailability(responseJson, today);
        console.log('------------------------------------------------');
    } catch (e) {
        console.log('Server Error: ', e.toString());
    }
}

const printAvailability= (response, today) => {
    console.log('------------------------------------------------');
    console.log('              LOCATIONS AVAILABLE               ');
    console.log('------------------------------------------------');
    console.log(today.toDateString(), today.toTimeString(), '\n');
    response.locations.map((location) => {
        console.log(location.name);
        if (location.name.toLowerCase().includes(request.location)){
            sendMessage();
        }
    });
}