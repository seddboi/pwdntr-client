import {Outlet, Navigate, useLocation } from 'react-router-dom';

export const PrivateRoutes = () => {
	const loginStatus = useLocation().state?.status || false;
	const aT = localStorage.getItem('aT');

	return loginStatus && aT !== null ? <Outlet /> : <Navigate to='/login' />
};