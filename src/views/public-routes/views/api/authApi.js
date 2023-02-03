import api from '@/api/api';

const URLS = {
	authLogin: '/auth/login',
};

export const handleLogin = (payload) => {
	return api.post(URLS.authLogin, payload);
};
