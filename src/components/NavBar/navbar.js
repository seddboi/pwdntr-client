import React from 'react';
import Axios from 'axios';
import { Box, AppBar, Toolbar, Typography, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../App';
import './navbar.css';

const navBtns = {
	false: [
		{ name: 'Login', route: '/login' },
		{ name: 'Signup', route: '/signup' },
	],
	true: [
		{ name: 'Home', route: '/home' },
		{ name: 'Passwords', route: '/saved' },
		{ name: 'Logout', route: '/login' },
	],
};

export function NavBar() {
	const navigate = useNavigate();

	const pageBtns = sessionStorage.getItem('_a') ? navBtns[true] : navBtns[false];
	const header = sessionStorage.getItem('_a') ? (
		<Typography variant="h4" sx={{ color: 'button.contrastText', textAlign: 'left' }}>
			{`Welcome, ` + sessionStorage.getItem('_un')}
		</Typography>
	) : (
		<ButtonBase
			className="title-btn"
			onClick={() => {
				navigate('/');
			}}
			sx={{
				fontSize: { sm: '30px', md: '40px' },
				color: 'button.contrastText',
				px: '5px',
				mx: 1,
				'&:hover': {
					color: 'button.light',
				},
			}}
		>
			PWDNTR
		</ButtonBase>
	);

	const logout = async () => {
		await Axios.post(APP_URL + '/logout', {
			userID: sessionStorage.getItem('_uid'),
			token: sessionStorage.getItem('_at'),
		}).then(() => {
			sessionStorage.removeItem('_at');
			sessionStorage.removeItem('_uid');
			sessionStorage.removeItem('_a');
			sessionStorage.removeItem('_un');
		});
	};

	return (
		<Box className="navbar" component="nav" sx={{ flexGrow: 1, margin: 0, width: '100%' }}>
			<AppBar position="static" sx={{ bgcolor: 'container.main' }}>
				<Toolbar>
					<Box
						sx={{
							display: { xs: 'none', sm: 'flex' },
							flexGrow: 1,
						}}
					>
						{header}
					</Box>
					{pageBtns.map((obj, i) => (
						<ButtonBase
							key={i}
							className="navbtn"
							variant="text"
							size="sm"
							disableRipple
							// disabled={obj.name === page ? true : false}
							onClick={(e) => {
								e.preventDefault();

								if (obj.name === 'Logout') {
									console.log('logout triggered');
									logout();
									navigate(obj.route, { replace: true });
								} else {
									navigate(obj.route);
								}
							}}
							sx={{
								fontSize: '20px',
								color: 'container.contrastText',
								p: '5px',
								mx: 1,
								'&:hover': {
									color: 'button.light',
								},
							}}
						>
							{obj.name}
						</ButtonBase>
					))}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
