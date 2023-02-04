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
	const [persist, setPersist] = useState(isDeviceTrusted);

	useEffect(() => {
		localStorage.setItem('persist', persist);
	}, [persist]);

	// prettier-ignore
	const authContext = useMemo(() => ({
			auth,
			setAuth,
			persist,
			setPersist
		}),
		[auth, setAuth, persist, setPersist]
	);

	return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export { AuthContext as authContext };

export default AuthProvider;
