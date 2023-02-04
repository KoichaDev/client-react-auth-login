import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '@/api/hooks/useAuth';
import { handleLogin } from '../api/authApi';

const AuthLogin = () => {
	const { setAuth, persistLogin, setPersistLogin } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	// we want navigate away to that from value, which means where the user wanted to go
	// before they were sent to the login page
	const from = location.state?.from?.pathname || '/';

	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
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
			const roles = response?.data.roles;

			setAuth({ user, password: pwd, roles, accessToken });
			setUser('');
			setPwd('');
			navigate(from, { replace: true });
		} catch (error) {
			if (!error?.response) {
				setErrMsg('No Server Response');
			} else if (error.response?.status === 400) {
				setErrMsg('Missing username or password');
			} else if (error.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else setErrMsg('Login Failed!');

			errRef.current.focus();
		}
	};

	const togglePersistHandler = () => {
		setPersistLogin((prevPersist) => !prevPersist);
	};

	return (
		<section>
			<p
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live='assertive'>
				{errMsg}
			</p>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					ref={userRef}
					autoComplete='off'
					onChange={(e) => setUser(e.target.value)}
					value={user}
					required
				/>

				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					required
				/>
				<button>Sign In</button>
				<div className='persistCheck'>
					<input
						type='checkbox'
						id='persist'
						onChange={togglePersistHandler}
						checked={persistLogin}
					/>
					<label htmlFor='persist'>Remember Me</label>
				</div>
			</form>
			<p>
				Need an Account?
				<br />
				<span className='line'>
					{/*put router link here*/}
					<Link to='/register'>Sign Up</Link>
				</span>
			</p>
		</section>
	);
};

export default AuthLogin;
