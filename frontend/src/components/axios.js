import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://educatify-edu.herokuapp.com',
  // baseURL: '',
});

export default instance;
