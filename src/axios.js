import axios from 'axios';
const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

let instance = axios.create({
    xsrfCookieName: 'mytoken',
    xsrfHeaderName: 'csrf-token'
});

export default instance;
