import { useState, useMemo } from 'react';
import AuthContext from './auth-context';

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	// prettier-ignore
	const authContext = useMemo(() => ({
			auth,
			setAuth,
		}),
		[auth, setAuth]
	);

	return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
