import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Box, AppBar, Toolbar, TextField, Typography, Button, InputAdornment, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../App';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { APP_URL } from '../../App';

export function Login() {
	const [loginUsername, setLoginUsername] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loginStatus, setLoginStatus] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [loginErrorMessage, setLoginErrorMessage] = useState('');
	const [loginError, setLoginError] = useState(false);

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
				setLoginError(true);
			}
		});
	};

	useEffect(() => {
		if (loginStatus) {
			navigate('/home', { state: { status: loginStatus, user: userInfo }, replace: true });
		}
		// eslint-disable-next-line
	}, [loginStatus]);

	return (
		<ThemeProvider theme={theme}>
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
									letterSpacing: { xs: 'none', sm: '0.4em', md: '0.6em' },
								}}
							>
								Passwordinator
							</Typography>
							<Button
								color="inherit"
								onClick={() => {
									navigate('/');
								}}
							>
								Generator
							</Button>
							<Button
								color="inherit"
								onClick={() => {
									navigate('/signup');
								}}
							>
								Signup
							</Button>
						</Toolbar>
					</AppBar>
				</Box>
				<Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '90%', maxWidth: '500px', m: 4 }}>
					<Typography variant="h2" color="#ffffff" sx={{ mb: '70px' }}>
						Welcome Back!
					</Typography>
					<TextField
						id="login-username"
						autoComplete="username"
						label="Username"
						error={loginError}
						variant="outlined"
						onChange={(e) => {
							setLoginUsername(e.target.value);
							setLoginError(false);
							setLoginErrorMessage('');
						}}
						sx={{ mt: 2, mb: 2 }}
					/>
					<TextField
						id="login-password"
						autoComplete="password"
						label="Password"
						error={loginError}
						type={showPassword ? 'text' : 'password'}
						variant="outlined"
						onChange={(e) => {
							setLoginPassword(e.target.value);
							setLoginError(false);
							setLoginErrorMessage('');
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handleVisibility}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
								</InputAdornment>
							),
						}}
						sx={{ mt: 2, mb: 2 }}
					/>
					<Typography id="submitMessage" variant="h6" sx={{ color: 'red', mb: 8 }}>
						{loginErrorMessage}
					</Typography>
				</Box>
				<Button color="primary" variant="contained" size="large" onClick={login} sx={{ mb: 8 }}>
					Login
				</Button>
			</Box>
		</ThemeProvider>
	);
}
