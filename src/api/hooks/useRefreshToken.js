import axios from '../api';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const getRefreshToken = async () => {
		const response = await axios.get('/auth/refresh');

		setAuth((prevAuthRequest) => {
			console.log(JSON.stringify(prevAuthRequest));
			console.log(response.data.accessToken);
			return { ...prevAuthRequest, accessToken: response.data.accessToken };
		});

		return response.data.accessToken;
	};

	return getRefreshToken;
};

export default useRefreshToken;
