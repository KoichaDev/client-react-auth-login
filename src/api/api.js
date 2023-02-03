import axios from 'axios';

const axiosParams = {
	baseURL: 'http://localhost:3500',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
};

/**
 * You can use interceptors to modify requests or responses, add headers, handle errors,
 * or even perform authentication. The code you define in an interceptor
 * will be run before the request is sent and after the response is received,
 * allowing you to manipulate the request and response objects as needed.
 */
export default axios.create(axiosParams);
