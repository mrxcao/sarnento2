import axios from 'axios';

const API_URL =  process.env.REACT_APP_API_URL;
export async function getReacts(authorization) {    
    const headers = {authorization: authorization}
    const response = await axios.get(`${API_URL}/react`,{headers} );
    return response.data;
}

export async function addReact(data, authorization) {
    const headers = {authorization: authorization}
    const response = await axios.post(`${API_URL}/react/add`, data, {headers});
    return response.data;
}
export async function getTriggerTypes(authorization) {    
    const headers = {authorization: authorization}
    const response = await axios.get(`${API_URL}/react/triggerTypes`,{headers} );
    return response.data;
}
export async function getDoTypes(authorization) {    
    const headers = {authorization: authorization}
    const response = await axios.get(`${API_URL}/react/doTypes`,{headers} );
    return response.data;
}
export async function updateReacts(props, authorization) {    
    const headers = {authorization}
    const response = await axios.put(`${API_URL}/react`,props,{headers}  );
    return response.data;
    return response.data;
}

export async function deleteReact(id, authorization) {
    const headers = {authorization}
    const response = await axios.delete(`${API_URL}/react/del`, { data: { _id: id }, headers });
    return response.data;
}
