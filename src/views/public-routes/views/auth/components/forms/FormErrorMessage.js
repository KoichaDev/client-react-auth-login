import { forwardRef } from 'react';

const FormErrorMessage = ({ errMsg }, ref) => {
	return (
		<p
			ref={ref}
			className={errMsg ? 'errmsg' : 'offscreen'}
			aria-live='assertive'>
			{errMsg}
		</p>
	);
};

export default forwardRef(FormErrorMessage);
