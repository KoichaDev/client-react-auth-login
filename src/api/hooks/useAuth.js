import { useContext } from 'react';
import { authContext } from '@/context/auth-provider';

const useAuth = () => {
	return useContext(authContext);
};

export default useAuth;
