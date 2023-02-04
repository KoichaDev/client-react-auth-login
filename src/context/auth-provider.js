import { useState, createContext, useMemo, useEffect } from 'react';

const AuthContext = createContext({
	auth: () => {},
	setAuth: () => {},
	persist: () => {},
	setPersist: () => {},
});
const isDeviceTrusted = JSON.parse(localStorage.getItem('persist')) || false;

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
	const [persistLogin, setPersistLogin] = useState(isDeviceTrusted);

	useEffect(() => {
		localStorage.setItem('persist', persistLogin);
	}, [persistLogin]);

	// prettier-ignore
	const authContext = useMemo(() => ({
			auth,
			setAuth,
			persistLogin,
			setPersistLogin
		}),
		[auth, setAuth, persistLogin, setPersistLogin]
	);

	return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export { AuthContext as authContext };

export default AuthProvider;
