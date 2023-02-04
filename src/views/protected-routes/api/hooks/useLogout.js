import api from '@/api/api';
import useAuth from '@/api/hooks/useAuth';

const useLogout = () => {
	const { setAuth } = useAuth();

	const logout = async () => {
		setAuth({});

		try {
			const response = await api.post('/auth/logout');
		} catch (error) {
			console.error(`❌ ${error}`);
		}
	};

	return logout;
};

export default useLogout;
