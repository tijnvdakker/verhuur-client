import axios from 'axios';
import Swal from 'sweetalert2';
const apiUrl = process.env.REACT_APP_API_URL;

export async function getRequest(url) {
    let response = false;

    try {
        response = await axios.get(apiUrl + url);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Whoops',
            text: error.response.data.message
        });
    }   
   
    console.log("Getrequest completed");

    return response;
}

export async function postRequest(url, data = {}) {
    let response = false;

    try {
        response = await axios.post(apiUrl + url, data);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Whoops',
            text: error.response.data.message
        });
    }   
   
    console.log("Postrequest completed");

    return response;
}

export function enterDetector(e, functionToCall) {
    if (e.key === 'Enter') {
        functionToCall(e);
    }
}

export function objectArrayFromConcatenatedString(concatenatedString) {
    if (!concatenatedString) {
        return [];
    }

    let objects = [];
    
    let subString = concatenatedString.split(',');

    subString.forEach(subStringPart => {
        let object = {};

        let pairs = subStringPart.split('|');

        pairs.map(pair => {
            let arrayPair = pair.split(':');

            object[arrayPair[0]] = arrayPair[1];
        });

        objects.push(object);
    });
  
    return objects;
}