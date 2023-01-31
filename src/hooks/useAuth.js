import { useContext } from 'react';
import authContext from '../context/auth-context';
import AuthContext from '../context/auth-context';

const useAuth = () => {
	return useContext(authContext);
};

export default useAuth;
