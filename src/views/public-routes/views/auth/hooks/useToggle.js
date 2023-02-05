import useLocalStorage from '@/hooks/useLocalStorage';

const useToggle = (key, initValue) => {
	const [value, setValue] = useLocalStorage(key, initValue);

	const handleToggle = (value) => {
		setValue((prevValue) => {
			return typeof value === 'boolean' ? value : !prevValue;
		});
	};

	return [value, handleToggle];
};

export default useToggle;
