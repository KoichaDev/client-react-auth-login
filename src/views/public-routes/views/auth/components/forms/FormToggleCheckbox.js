const FormToggleCheckbox = ({ ...rest }) => {
	return (
		<div className='persistCheck'>
			<input
				type='checkbox'
				id='persist'
				{...rest}
			/>
			<label htmlFor='persist'>Remember Me</label>
		</div>
	);
};

export default FormToggleCheckbox;
