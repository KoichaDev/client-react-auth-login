import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/api/hooks/useAuth';
import jwt_decode from 'jwt-decode';

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();

	const accessToken = auth?.accessToken;

	const decoded = accessToken ? jwt_decode(accessToken) : undefined;

	const roles = decoded?.userInfo?.roles || [];

	const isAllowedEnteredRole = roles?.find((role) => allowedRoles?.includes(role));

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
