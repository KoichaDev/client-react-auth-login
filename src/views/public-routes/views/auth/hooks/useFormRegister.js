import { useState } from 'react';

export const useUser = () => {
	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	return {
		user,
		setUser,
		validName,
		setValidName,
		userFocus,
		setUserFocus,
	};
};

export const usePassword = () => {
	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	return {
		pwd,
		setPwd,
		validPwd,
		setValidPwd,
		pwdFocus,
		setPwdFocus,
	};
};

export const useMatchPassword = () => {
	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	return {
		matchPwd,
		setMatchPwd,
		validMatch,
		setValidMatch,
		matchFocus,
		setMatchFocus,
	};
};

export const useSuccess = () => {
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	return {
		errMsg,
		setErrMsg,
		success,
		setSuccess,
	};
};
