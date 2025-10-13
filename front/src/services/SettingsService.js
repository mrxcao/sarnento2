import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL;
export async function getSettings(authorization) {    
    const headers = {authorization: authorization}
    const response = await axios.get(`${API_URL}/settings`,{headers} );
    return response.data;
}

export async function getStatus(authorization) {    
    const headers = {authorization: authorization}
    const response = await axios.get(`${API_URL}/status`,{headers} );
    return response.data;
}

export async function updateSettings(props, authorization) {    
    const headers = {authorization}
    const response = await axios.put(`${API_URL}/settings`,props,{headers}  );
    return response.data;
}
