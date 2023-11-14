import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Box, AppBar, Toolbar, InputLabel, InputBase, Typography, Button, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { APP_URL } from '../../App';

export function Login() {
	const [loginUsername, setLoginUsername] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loginStatus, setLoginStatus] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [loginErrorMessage, setLoginErrorMessage] = useState('');
	// const [loginError, setLoginError] = useState(false);

	const navigate = useNavigate();

	const handleVisibility = () => {
		setShowPassword(!showPassword);
	};

	const login = async () => {
		await Axios.post(APP_URL + '/login', {
			username: loginUsername,
			password: loginPassword,
		}).then((res) => {
			if (res.data.auth) {
				sessionStorage.setItem('aT', res.data.token);
				setLoginStatus(res.data.auth);
				setUserInfo(res.data.result);
			} else {
				setLoginErrorMessage(res.data.message);
				// setLoginError(true);
			}
			setLoginUsername('');
			setLoginPassword('');
		});
	};

	useEffect(() => {
		if (loginStatus) {
			navigate('/home', { state: { status: loginStatus, user: userInfo }, replace: true });
		}
		// eslint-disable-next-line
	}, [loginStatus]);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Box component="nav" sx={{ flexGrow: 1, margin: 0, width: '100%' }}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							variant="h4"
							sx={{
								display: { xs: 'none', sm: 'block' },
								flexGrow: 1,
								textAlign: 'start',
								letterSpacing: { xs: 'none', sm: '0.2em', md: '0.4em' },
							}}
						>
							Passwordinator
						</Typography>
						<Button
							color="button"
							onClick={() => {
								navigate('/');
							}}
							sx={{ fontSize: '20px' }}
						>
							Generator
						</Button>
						<Button
							color="button"
							onClick={() => {
								navigate('/signup');
							}}
							sx={{ fontSize: '20px' }}
						>
							Signup
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '90%', maxWidth: '500px', m: 4 }}>
				<Typography variant="h2" color="#ffffff" sx={{ mb: 5 }}>
					Welcome Back!
				</Typography>
				<InputLabel htmlFor="login-username" sx={{ color: '#eeeeee', fontSize: '20px', textAlign: 'left' }}>
					Username
				</InputLabel>
				<InputBase
					id="login-username"
					autoComplete="username"
					placeholder="johndoe123"
					value={loginUsername}
					onChange={(e) => {
						setLoginUsername(e.target.value.trim());
						// setLoginError(false);
						setLoginErrorMessage('');
					}}
					sx={{
						py: '5px',
						px: 2,
						mb: 2,
						border: '1px solid rgba(0, 0, 0, 0.4)',
						backgroundColor: '#ffffff',
					}}
				/>

				<InputLabel htmlFor="login-password" sx={{ color: '#eeeeee', fontSize: '20px', textAlign: 'left' }}>
					Password
				</InputLabel>
				<InputBase
					id="login-password"
					autoComplete="password"
					placeholder="randompass123"
					value={loginPassword}
					type={showPassword ? 'text' : 'password'}
					onChange={(e) => {
						setLoginPassword(e.target.value.trim());
						// setLoginError(false);
						setLoginErrorMessage('');
					}}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={handleVisibility}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
						</InputAdornment>
					}
					sx={{
						py: '5px',
						px: 2,
						mb: 2,
						border: '1px solid rgba(0, 0, 0, 0.4)',
						backgroundColor: '#ffffff',
					}}
				/>
				<Typography id="submitMessage" variant="h6" sx={{ color: 'red', mb: 5, fontSize: '20px' }}>
					{loginErrorMessage}
				</Typography>
			</Box>
			<Button
				color="button"
				variant="contained"
				size="large"
				disabled={loginUsername === '' || loginPassword === '' ? true : false}
				onClick={login}
			>
				Login
			</Button>
		</Box>
	);
}
