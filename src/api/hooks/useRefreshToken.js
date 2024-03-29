import { useEffect } from 'react';
import api from '../api';
import useAuth from './useAuth';

export const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const getRefreshToken = async () => {
		const response = await api.get('/auth/refresh');

		setAuth((prevAuthRequest) => {
			console.log('Previous Auth Request token: ', JSON.stringify(prevAuthRequest));

			return {
				...prevAuthRequest,
				roles: response.data.roles,
				accessToken: response.data.accessToken,
			};
		});

		return response.data.accessToken;
	};

	return getRefreshToken;
};

export const useInterceptorRefreshToken = () => {
	const getRefreshToken = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		// prettier-ignore
		const requestIntercept = api.interceptors.request.use((config) => {
			// The Authorization could be possible been set.
			// If we know that the Authorization header does not exist, then we know it is
			// not a retry! This will be our first attempt
			if (!config.headers['Authorization']) {
				// The access token could be initially when we are signed in or it could be
				// the access token that we got after a refresh. Either way, this is the initial
				// request. We know the Authorization header was not set, so we are passing it in,
				// otherwise if it is set, it is a retry and it is already been set here after 403
				// after a failed request
				config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
			}
			return config;
		},
		async (error) => {
			Promise.reject(error);
		}
	);

		return () => {
			api.interceptors.request.eject(requestIntercept);
		};
	}, [auth, getRefreshToken]);

	useEffect(() => {
		// prettier-ignore
		const responseIntercept = api.interceptors.response.use((response) => response,
			async (error) => {
				const prevRequest = error?.config;

				// we only want to retry once and the "sent" property indicates that
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await getRefreshToken();
					console.log("new intercepted refresh token: ", newAccessToken);
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					// We are updating the request with our refresh token, so we should have a new access token
					return api(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			api.interceptors.response.eject(responseIntercept);
		};
	}, [auth, getRefreshToken]);

	return api;
};
