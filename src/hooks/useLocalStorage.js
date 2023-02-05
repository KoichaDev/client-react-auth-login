import { useState, useEffect } from 'react';

const getLocalValue = (key, initValue) => {
	// SSR Next.js or something similar...

	if (typeof window === 'undefined') {
		return initValue;
	}

	// if a value is already store
	const localValue = JSON.parse(localStorage.getItem(key));

	if (localValue) {
		return localValue;
	}

	// If the initValue is a function, it will return the result of the function.
	if (initValue instanceof Function) {
		return initValue();
	}

	return initValue;
};

const useLocalStorage = (key, initValue) => {
	const [value, setValue] = useState(() => getLocalValue(key, initValue));

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;
