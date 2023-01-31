import Admin from './views/Admin';
import Editor from './views/Editor';
import Home from './views/Home';
import Lounge from './views/Lounge';
import RequireAuth from './views/RequireAuth';

const ROLES = {
	User: 2001,
	Editor: 1984,
	Admin: 5150,
};

const protectedRoutes = [
	{
		element: <RequireAuth allowedRoles={[ROLES.User]} />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
	{
		element: <RequireAuth allowedRoles={[ROLES.Editor]} />,
		children: [
			{
				path: 'editor',
				element: <Editor />,
			},
		],
	},
	{
		element: <RequireAuth allowedRoles={[ROLES.Admin]} />,
		children: [
			{
				path: 'admin',
				element: <Admin />,
			},
		],
	},
	{
		element: <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />,
		children: [
			{
				path: 'lounge',
				element: <Lounge />,
			},
		],
	},
];

export default protectedRoutes;
