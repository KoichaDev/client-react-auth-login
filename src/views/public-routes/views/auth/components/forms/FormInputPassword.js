import React from 'react';

const FormInputPassword = ({ ...rest }) => {
	return (
		<>
			<label htmlFor='password'>Password:</label>
			<input
				type='password'
				id='password'
				{...rest}
				required
			/>
		</>
	);
};

export default FormInputPassword;
