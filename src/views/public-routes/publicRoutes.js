import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Navigate from './views/Navigate';
import Forbidden from './views/Forbidden';

const publicRoutes = [
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'register',
		element: <Register />,
	},
	{
		path: 'link-page',
		element: <Navigate />,
	},
	{
		path: 'forbidden',
		element: <Forbidden />,
	},
];

export default publicRoutes;
