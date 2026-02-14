import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL;

export const getLogs = (token, filters) => {
    return new Promise((resolve, reject) => {
        const headers = {
            authorization: token
        }
        
        axios.get(`${API_URL}/logMessages/filter`, {
            headers: headers,
            params: filters
        })
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}

export const getLogActions = (token, filters) => {
    return new Promise((resolve, reject) => {
        const headers = {
            authorization: token
        }
        
        axios.get(`${API_URL}/logActions/filter`, {
            headers: headers,
            params: filters
        })
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}
