import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Box, InputLabel, InputBase, Typography, Button, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layout/layout.js';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { APP_URL } from '../../App';

export function Login() {
	const [loginUsername, setLoginUsername] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [status, setStatus] = useState(false);
	const [loginErrorMessage, setLoginErrorMessage] = useState('');

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
				sessionStorage.setItem('_at', res.data.token);
				sessionStorage.setItem('_a', res.data.auth);
				sessionStorage.setItem('_un', res.data.result.username);
				sessionStorage.setItem('_uid', res.data.result.id);
				setStatus(res.data.auth);
			} else {
				setLoginErrorMessage(res.data.message);
			}
			setLoginUsername('');
			setLoginPassword('');
		});
	};

	useEffect(() => {
		if (status) {
			navigate('/home', { replace: true });
		}
		// eslint-disable-next-line
	}, [status]);

	return (
		<Layout>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '90%', maxWidth: '500px', m: 4 }}>
					<Typography variant="h2" color="container.contrastText" sx={{ mb: 5 }}>
						Welcome Back!
					</Typography>
					<InputLabel htmlFor="login-username" sx={{ color: 'container.contrastText', fontSize: '20px', textAlign: 'left' }}>
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

					<InputLabel htmlFor="login-password" sx={{ color: 'container.contrastText', fontSize: '20px', textAlign: 'left' }}>
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
		</Layout>
	);
}
