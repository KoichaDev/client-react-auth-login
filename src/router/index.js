import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/RootLayout';

import protectedRouts from '../views/protected-routes/protectedRoutes';
import publicRoutes from '../views/public-routes/publicRoutes';
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <NotFound />,
		children: [...publicRoutes, ...protectedRouts],
	},
]);

export default router;
