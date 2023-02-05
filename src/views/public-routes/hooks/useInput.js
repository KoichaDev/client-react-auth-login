import useLocalStorage from '@/hooks/useLocalStorage';

const useInput = (key, initValue) => {
	const [value, setValue] = useLocalStorage(key, initValue);

	const resetUser = () => setValue(initValue);

	const userAttribute = {
		value,
		onChange: (e) => setValue(e.target.value),
	};

	return [value, resetUser, userAttribute];
};

export default useInput;
