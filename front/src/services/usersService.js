import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function getUsers(filters, authorization) {
    const headers = { authorization };
    let query = '';
    if (filters) {
        const params = new URLSearchParams();
        if (filters.username) params.append('username', filters.username);
        if (filters.id) params.append('id', filters.id);
        query = `?${params.toString()}`;
    }
    
    const response = await axios.get(`${API_URL}/users${query}`, { headers });
    return response.data;
}
