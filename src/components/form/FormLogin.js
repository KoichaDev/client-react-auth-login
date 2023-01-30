import { useRef, useState, useContext, useEffect } from 'react';
import authContext from '../../context/auth-context';
import axios from '../../api/axios';

const LOGIN_URL = '/auth/login';

const Login = () => {
	const { setAuth } = useContext(authContext);
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(LOGIN_URL, JSON.stringify({ user, password: pwd }), {
				headers: { 'Content-Type': 'application/json' },
				widthCredentials: true,
			});

			console.log(JSON.stringify(response?.data));

			const accessToken = response?.data.accessToken;
			const roles = response?.data.roles;

			setAuth({ user, password: pwd, roles, accessToken });
			setUser('');
			setPwd('');
			setSuccess(true);
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

	return (
		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<a href='#'>Go to Home</a>
					</p>
				</section>
			) : (
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
					</form>
					<p>
						Need an Account?
						<br />
						<span className='line'>
							{/*put router link here*/}
							<a href='#'>Sign Up</a>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Login;
