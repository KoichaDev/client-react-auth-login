import { Link } from 'react-router-dom';

const LinkSignUp = ({ to }) => {
	return (
		<p>
			Need an Account?
			<br />
			<span className='line'>
				<Link to={to}>Sign Up</Link>
			</span>
		</p>
	);
};

export default LinkSignUp;
