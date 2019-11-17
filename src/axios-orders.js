import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-app2.firebaseio.com/'
});

export default instance;