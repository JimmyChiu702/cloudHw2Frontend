import axios from 'axios';

export function getLightState() {
    let url = 'getLightState';
    return axios.get(url).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function switchLight(newLightState) {
    let url = 'switchLight';
    return axios.post(url, {
        newLightState: newLightState
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}