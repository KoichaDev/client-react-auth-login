import { useEffect, useState } from 'react';
import useAxiosInterceptorsRefreshToken from '@/api/hooks/useAxiosInterceptorsRefreshToken';
import { useNavigate, useLocation } from 'react-router-dom';

const URLS = {
	fetchAllUsers: '/users/get-users',
};

export const useFetchUsers = () => {
	const [error, setError] = useState('');
	const [status, setStatus] = useState(0);
	const [users, setUsers] = useState([]);
	const [response, setResponse] = useState({});
	const interceptRefreshToken = useAxiosInterceptorsRefreshToken();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getUsers = async () => {
			try {
				const response = await interceptRefreshToken.get(URLS.fetchAllUsers, {
					signal: controller.signal,
				});

				setResponse(response);

				setStatus(response.status);

				if (isMounted) {
					setUsers(response.data);
				}
			} catch (error) {
				console.error('❌ ', error);
				setError(error);
				navigate('/login', {
					state: {
						from: location,
					},
					replace: true,
				});
			}
		};

		getUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return { error, users, status, response };
};