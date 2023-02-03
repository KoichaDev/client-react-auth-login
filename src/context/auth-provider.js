import { useState, createContext, useMemo } from 'react';

const AuthContext = createContext({
	auth: () => {},
	setAuth: () => {},
});

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

export { AuthContext as authContext };

export default AuthProvider;
