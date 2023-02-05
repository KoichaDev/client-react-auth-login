import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PWD_REGEX, REGISTER_URL, USER_REGEX } from './helpers/formValidator';

import api from '@/api/api';

import { useUser, usePassword, useSuccess, useMatchPassword } from './hooks/useFormRegister';

import FormErrorMessage from './components/forms/FormErrorMessage';
import LinkSignIn from './components/links/LinkSignIn';

const AuthRegister = () => {
	const userRef = useRef();
	const errRef = useRef();

	const { user, setUser, validName, setValidName, userFocus, setUserFocus } = useUser();
	const { pwd, setPwd, validPwd, setValidPwd, pwdFocus, setPwdFocus } = usePassword();
	const { matchPwd, setMatchPwd, validMatch, setValidMatch, matchFocus, setMatchFocus } = useMatchPassword();
	const { errMsg, setErrMsg, success, setSuccess } = useSuccess();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		const result = USER_REGEX.test(user);
		setValidName(result);
	}, [user]);

	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		const isMatchedPassword = pwd === matchPwd;

		setValidPwd(result);
		setValidMatch(isMatchedPassword);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd, matchPwd]);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg('Invalid Entry');
			return;
		}

		try {
			const signUpPayload = JSON.stringify({ user, password: pwd });

			const response = await api.post(REGISTER_URL, signUpPayload);

			console.log(response?.data);
			console.log(response?.accessToken);
			console.log(JSON.stringify(response));
			setSuccess(true);

			//clear state and controlled inputs
			//need value attrib on inputs for this
			setUser('');
			setPwd('');
			setMatchPwd('');
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				setErrMsg('Registration Failed');
			}
		}
	};

	return (
		<>
			{success ? (
				<LinkSignIn to='/login' />
			) : (
				<section>
					<FormErrorMessage
						ref={errRef}
						errMsg={errMsg}
					/>

					<h1>Register</h1>
					<form onSubmit={onSubmitHandler}>
						<label htmlFor='username'>
							Username:
							<span className={validName ? 'valid' : 'hide'}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							<span className={validName || !user ? 'hide' : 'invalid'}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</label>
						<input
							type='text'
							id='username'
							ref={userRef}
							autoComplete='off'
							onChange={(e) => setUser(e.target.value)}
							value={user}
							aria-invalid={validName ? 'false' : 'true'}
							aria-describedby='uidnote'
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
							required
						/>
						<p
							id='uidnote'
							className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
							<FontAwesomeIcon icon={faInfoCircle} />
							4 to 24 characters.
							<br />
							Must begin with a letter.
							<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>

						<label htmlFor='password'>
							Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validPwd ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validPwd || !pwd ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type='password'
							id='password'
							autoComplete='off'
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							aria-invalid={validPwd ? 'false' : 'true'}
							aria-describedby='pwdnote'
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<p
							id='pwdnote'
							className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
							<FontAwesomeIcon icon={faInfoCircle} />
							8 to 24 characters.
							<br />
							Must include uppercase and lowercase letters, a number and a special character.
							<br />
							Allowed special characters: <span aria-label='exclamation mark'>!</span>{' '}
							<span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>{' '}
							<span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
						</p>

						<label htmlFor='confirm_pwd'>
							Confirm Password:
							<FontAwesomeIcon
								icon={faCheck}
								className={validMatch && matchPwd ? 'valid' : 'hide'}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={validMatch || !matchPwd ? 'hide' : 'invalid'}
							/>
						</label>
						<input
							type='password'
							id='confirm_pwd'
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? 'false' : 'true'}
							aria-describedby='confirmnote'
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p
							id='confirmnote'
							className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>

						<button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
					</form>
					<p>
						Already registered?
						<br />
						<span className='line'>
							{/*put router link here*/}
							<Link to='/login'>Sign In</Link>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default AuthRegister;
