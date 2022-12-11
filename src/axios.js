import axios from 'axios';

// eslint-disable-next-line
let baseURLDev = 'http://localhost:4000/fuse';
// eslint-disable-next-line
let baseURLProd = 'https://fuse-server.onrender.com/fuse'
// eslint-disable-next-line
let server = 'https://fuse45.thefuse.in/fuse';

const instance = axios.create({
  baseURL: baseURLProd 
});

export default instance;