import { Outlet } from 'react-router-dom';

const RootLayout = () => {
	return (
		<main className='App'>
			{/*
			 * Represents all the children of the layout components. Anything nested inside the layout
			 * Components is represented by the outlet. You can have Header, Footer, Aside component etc.
			 */}

			<Outlet />
		</main>
	);
};

export default RootLayout;
