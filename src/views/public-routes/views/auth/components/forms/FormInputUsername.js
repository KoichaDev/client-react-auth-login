import { forwardRef } from 'react';

const FormInputUsername = ({ ...userAttribute }, ref) => {
	return (
		<>
			<label htmlFor='username'>Username:</label>
			<input
				type='text'
				id='username'
				ref={ref}
				autoComplete='off'
				{...userAttribute}
				required
			/>
		</>
	);
};

export default forwardRef(FormInputUsername);
