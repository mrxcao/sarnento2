import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function getTopGuildsMessages(authorization) {
    const headers = { authorization };
    const response = await axios.get(`${API_URL}/logMessages/topGuilds`, { headers });
    return response.data;
}

export async function getTopUsersMessages(authorization) {
    const headers = { authorization };
    const response = await axios.get(`${API_URL}/logMessages/topUsers`, { headers });
    return response.data;
}

export async function getTopGuildsActions(authorization) {
    const headers = { authorization };
    const response = await axios.get(`${API_URL}/logActions/topGuilds`, { headers });
    return response.data;
}

export async function getTopUsersActions(authorization) {
    const headers = { authorization };
    const response = await axios.get(`${API_URL}/logActions/topUsers`, { headers });
    return response.data;
}
