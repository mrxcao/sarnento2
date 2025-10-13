import axios from 'axios';

const API_URL = process.env.REACT_APP_NODE_ENV=='Development' ?  process.env.REACT_APP_API_URL  :  process.env.REACT_APP_API_URL;

export async function doLogin(login, password) {
    const loginUrl = `${API_URL}/token/login`;
    const response = await axios.post(loginUrl, { login, password });
    return response.data;
}

export async function doLogout() {
    const logoutUrl = `${API_URL}/token/logout`;
    const headers = { 'authorization': `Bearer ${localStorage.getItem('token')} ` };
    const response = await axios.post(logoutUrl, {}, { headers });
    return response.data;
}