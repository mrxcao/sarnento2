/*
const axios = require('axios') ;

// const store = require('./store');
// const router = require('./router');

const url = process.env.CL_API_URL;
const key = process.env.CL_API_KEY;

const options = {
	method: 'GET',
	url: url + '/list',
	params: { access_key: key },
	headers: {
		'X-RapidAPI-Key': key,
		'X-RapidAPI-Host': 'apilayer-currencylayer-v1.p.rapidapi.com',
	},
};


axios.request(options).then(function(response) {
	console.log(response.data);
}).catch(function(error) {
	console.error(error);
});
*/
/*
const instance = axios.create({
  baseURL: process.env.CL_API_URL,
  headers: {"Content-type": "application/json"}
});
instance.interceptors.request.use(
  request => {
    if (
      store.getters["authentication/token"] &&
      router.history.current.name != "Login"
    )
      request.headers.Authorization =
        "Bearer " + store.getters["authentication/token"];
    return request;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    let status = error.response ? error.response.status : 400;
    if (status === 401) {
      if (router.history.current.path !== "login") router.replace("login");
    }
    return Promise.reject(error.response);
  }
);

export default instance;
*/
