import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();

	const isAllowedEnteredRole = auth?.roles?.find((role) => allowedRoles?.includes(role));

	return (
		<>
			{isAllowedEnteredRole ? (
				<Outlet />
			) : auth?.user ? (
				<Navigate
					to='/unauthorized'
					state={{
						from: location,
					}}
					replace
				/>
			) : (
				<Navigate
					to='/login'
					state={{
						from: location,
					}}
					replace
				/>
			)}
		</>
	);
};

export default RequireAuth;
