import { Link } from 'react-router-dom';

const LinkSignIn = ({ to }) => {
	return (
		<section>
			<h1>Success!</h1>
			<p>
				<Link to={to}>Sign In</Link>
			</p>
		</section>
	);
};

export default LinkSignIn;
