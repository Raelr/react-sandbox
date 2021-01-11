import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-e3349-default-rtdb.firebaseio.com/'
});

export default instance;