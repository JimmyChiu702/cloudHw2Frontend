import axios from 'axios';

export function getLightState() {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

export function switchLight(newLightState) {
    return new Promise((resolve, reject) => {
        resolve(newLightState);
    });
}