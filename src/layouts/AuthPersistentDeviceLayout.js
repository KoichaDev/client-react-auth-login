import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshToken from '@/api/hooks/useRefreshToken';
import useAuth from '@/api/hooks/useAuth';

const AuthPersistentDeviceLayout = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refreshToken = useRefreshToken();
	const { auth, persistLogin } = useAuth();

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refreshToken();
			} catch (error) {
				console.error('❌ ', error);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		if (!auth?.accessToken) {
			verifyRefreshToken();
		} else {
			setIsLoading(false);
		}

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		console.log(`isLoading: ${isLoading}`);
		console.log(`Auth Token: ${JSON.stringify(auth?.accessToken)}`);
	}, [isLoading]);

	return <>{!persistLogin ? <Outlet /> : isLoading ? <p>Is loading...</p> : <Outlet />}</>;
};

export default AuthPersistentDeviceLayout;
