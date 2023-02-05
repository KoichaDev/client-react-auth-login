import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// API
import { handleLogin } from '../api/authApi';

// Hooks
import useAuth from '@/api/hooks/useAuth';
import useInput from './hooks/useInput';
import useToggle from './hooks/useToggle';

// UI Components
import FormErrorMessage from './components/forms/FormErrorMessage';
import FormInputPassword from './components/forms/FormInputPassword';
import FormInputUsername from './components/forms/FormInputUsername';
import FormToggleCheckbox from './components/forms/FormToggleCheckbox';

import LinkSignUp from './components/links/LinkSignUp';

const AuthLogin = () => {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	// we want navigate away to that from value, which means where the user wanted to go
	// before they were sent to the login page
	const from = location.state?.from?.pathname || '/';

	const userRef = useRef();
	const errRef = useRef();

	const [user, resetUser, userAttribute] = useInput('enteredUserInput', '');
	const [toggleCheck, setToggleCheck] = useToggle('persist', false);
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const loginData = JSON.stringify({ user, password: pwd });

		try {
			const response = await handleLogin(loginData);

			console.log(JSON.stringify(response?.data));

			const accessToken = response?.data.accessToken;

			setAuth({ user, accessToken });
			resetUser();
			setPwd('');
			navigate(from, { replace: true });
		} catch (error) {
			if (!error?.response) {
				setErrMsg('No Server Response');
			} else if (error.response?.status === 400) {
				setErrMsg('Missing username or password');
			} else if (error.response?.status === 401) {
				setErrMsg('forbidden');
			} else setErrMsg('Login Failed!');

			errRef.current.focus();
		}
	};

	return (
		<section>
			<FormErrorMessage
				ref={errRef}
				errMsg={errMsg}
			/>

			<h1>Sign In</h1>

			<form onSubmit={handleSubmit}>
				<FormInputUsername
					ref={userRef}
					{...userAttribute}
				/>

				<FormInputPassword
					value={pwd}
					onChange={(e) => setPwd(e.target.value)}
				/>

				<button>Sign In</button>

				<FormToggleCheckbox
					onChange={setToggleCheck}
					checked={toggleCheck}
				/>
			</form>
			<LinkSignUp to='/register' />
		</section>
	);
};

export default AuthLogin;
