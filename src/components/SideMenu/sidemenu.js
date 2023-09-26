import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FolderShared, Home, Logout, Close } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_URL, theme } from '../../App';

export function SideMenu({ open, onClose, isHome }) {
	const location = useLocation();

	const [isLoggedIn, setIsLoggedIn] = useState(location.state.status);
	const navigate = useNavigate();

	const pageSelector = isHome ? '/saved' : '/home';

	const logout = async () => {
		await Axios.post(APP_URL + '/logout', {
			userID: location.state.user.id,
			token: sessionStorage.getItem('aT'),
		}).then((res) => {
			setIsLoggedIn(res.data.auth);
			sessionStorage.removeItem('aT');
		});
	};

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login', { state: { status: isLoggedIn }, replace: true });
		}
		// eslint-disable-next-line
	}, [isLoggedIn]);

	return (
		<ThemeProvider theme={theme}>
			<Drawer open={open} PaperProps={{ sx: { color: '#eeeeee', backgroundColor: '#5A5A5A', width: { xs: '100%', sm: '50%' } } }}>
				<List>
					<ListItem>
						<IconButton onClick={onClose} color="button">
							<Close />
						</IconButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								navigate(pageSelector, {
									state: { status: isLoggedIn, user: { id: location.state.user.id, username: location.state.user.username } },
								});
							}}
						>
							<ListItemIcon sx={{ color: 'white' }}>
								{isHome ? <FolderShared fontSize="large" /> : <Home fontSize="large" />}
							</ListItemIcon>
							<ListItemText color="primary" primary={isHome ? 'Passwords' : 'Home'}></ListItemText>
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton
							onClick={() => {
								logout();
							}}
						>
							<ListItemIcon sx={{ color: 'white' }}>
								<Logout fontSize="large" />
							</ListItemIcon>
							<ListItemText primary="Logout"></ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</ThemeProvider>
	);
}
