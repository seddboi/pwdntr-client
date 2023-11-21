import React from 'react';
import Axios from 'axios';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../App';

const navBtns = {
	false: [
		{ name: 'Generator', route: '/' },
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
	const header = sessionStorage.getItem('_a') ? `Welcome, ` + sessionStorage.getItem('_un') : 'Passwordinator';

	const logout = async () => {
		await Axios.post(APP_URL + '/logout', {
			userID: sessionStorage.getItem('_uid'),
			token: sessionStorage.getItem('_at'),
		}).then((res) => {
			sessionStorage.removeItem('_at');
			sessionStorage.removeItem('_uid');
			sessionStorage.removeItem('_a');
			sessionStorage.removeItem('_un');
		});
	};

	return (
		<Box component="nav" sx={{ flexGrow: 1, margin: 0, width: '100%', bgcolor: 'background' }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h4"
						sx={{
							display: { xs: 'none', sm: 'block' },
							flexGrow: 1,
							textAlign: 'start',
						}}
					>
						{header}
					</Typography>
					{pageBtns.map((obj, i) => (
						<Button
							key={i}
							color="button"
							onClick={() => {
								if (obj.name === 'Logout') {
									console.log('logout triggered');
									logout();
									navigate(obj.route, { replace: true });
								} else {
									navigate(obj.route);
								}
							}}
							sx={{ fontSize: '20px' }}
						>
							{obj.name}
						</Button>
					))}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
