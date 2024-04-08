import axios from 'axios';

const mlaAxios = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL_LOCAL, //YOUR_API_URL HERE
    mode:'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export default mlaAxios;