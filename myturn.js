import { setArguments, getParams } from './utils/utils.js';
import { callMyTurn } from './client/client.js';

const url = 'https://api.myturn.ca.gov/public/locations/search';

const sleep = (ms) =>  new Promise(resolve => setTimeout(resolve, ms));
 
const run = async () => {
    let runs = 0;
    setArguments();
    const params = getParams();
    while (runs < params.duration) {
        callMyTurn(url);
        await sleep(params.timeout);
        runs += 1;
    }    
}

run(url);
