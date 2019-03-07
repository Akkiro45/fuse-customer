import axios from 'axios';

// eslint-disable-next-line
let baseURLDev = 'http://localhost:4000/fuse';
// eslint-disable-next-line
let baseURLProd = 'https://quiet-wildwood-54834.herokuapp.com/fuse'
// eslint-disable-next-line
let server = 'http://ec2-13-233-165-128.ap-south-1.compute.amazonaws.com/fuse';

const instance = axios.create({
  baseURL: server 
});

export default instance;