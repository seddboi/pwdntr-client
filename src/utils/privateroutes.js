import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = () => {
	const loginStatus = sessionStorage.getItem('_a') || false;
	const aT = sessionStorage.getItem('_at') || false;

	return loginStatus && aT ? <Outlet /> : <Navigate to="/login" />;
};
