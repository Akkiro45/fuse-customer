import axios from 'axios';

// eslint-disable-next-line
let baseURLDev = 'http://localhost:4000/fuse';
// eslint-disable-next-line
let baseURLProd = 'https://quiet-wildwood-54834.herokuapp.com/fuse'

const instance = axios.create({
  baseURL: baseURLDev 
});

export default instance;