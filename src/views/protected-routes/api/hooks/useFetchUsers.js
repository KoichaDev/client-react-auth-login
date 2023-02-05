import { useEffect, useState } from 'react';
import { useInterceptorRefreshToken } from '@/api/hooks/useRefreshToken';
import { useNavigate, useLocation } from 'react-router-dom';

const URLS = {
	fetchAllUsers: '/users/get-users',
};

export const useFetchUsers = () => {
	const [error, setError] = useState('');
	const [status, setStatus] = useState(0);
	const [users, setUsers] = useState([]);
	const [response, setResponse] = useState({});
	const interceptRefreshToken = useInterceptorRefreshToken();

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

				const userNames = response?.data.map((user) => {
					return { id: user._id, username: user.username };
				});

				setResponse(response);
				setStatus(response.status);

				if (isMounted) {
					setUsers(userNames);
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
