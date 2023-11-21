import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Box, InputLabel, InputBase, Typography, Button, IconButton, InputAdornment } from '@mui/material';
import { Layout } from '../layout/layout.js';
import { useNavigate } from 'react-router-dom';
import { APP_URL } from '../../App';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function Signup() {
	const [regUsername, setRegUsername] = useState('');
	const [regPassword, setRegPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [regEmail, setRegEmail] = useState('');
	const [loginStatus, setLoginStatus] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [signupErrorMessage, setSignupErrorMessage] = useState('');
	// const [signupError, setSignupError] = useState(false);

	const navigate = useNavigate();

	const handleVisibility = () => {
		setShowPassword(!showPassword);
	};

	const signup = async () => {
		await Axios.post(APP_URL + '/signup', {
			username: regUsername,
			password: regPassword,
			email: regEmail,
		}).then((res) => {
			if (res.data.auth) {
				console.log(res.data);
				sessionStorage.setItem('aT', res.data.token);
				setLoginStatus(res.data.auth);
				setUserInfo(res.data.result);
			} else {
				setSignupErrorMessage(res.data.message);
				// setSignupError(true);
			}
			setRegUsername('');
			setRegEmail('');
			setRegPassword('');
		});
	};

	useEffect(() => {
		if (loginStatus) {
			navigate('/home', { state: { status: loginStatus, user: userInfo }, replace: true });
		}
		// eslint-disable-next-line
	}, [loginStatus]);

	return (
		<Layout>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '90%', maxWidth: '500px', margin: 4 }}>
					<Typography variant="h2" color="#ffffff" sx={{ mb: 1 }}>
						Signup Below!
					</Typography>

					<InputLabel htmlFor="signup-username" sx={{ color: '#eeeeee', fontSize: '20px', textAlign: 'left' }}>
						Username
					</InputLabel>
					<InputBase
						id="signup-username"
						placeholder="Username"
						value={regUsername}
						onChange={(e) => {
							setRegUsername(e.target.value.trim());
						}}
						sx={{
							py: '5px',
							px: 2,
							mb: 2,
							border: '1px solid rgba(0, 0, 0, 0.4)',
							backgroundColor: '#ffffff',
						}}
					/>

					<InputLabel htmlFor="signup-email" sx={{ color: '#eeeeee', fontSize: '20px', textAlign: 'left' }}>
						Email
					</InputLabel>
					<InputBase
						id="signup-email"
						placeholder="Email"
						value={regEmail}
						// error={signupError}
						onChange={(e) => {
							setRegEmail(e.target.value.trim());
						}}
						sx={{
							py: '5px',
							px: 2,
							mb: 2,
							border: '1px solid rgba(0, 0, 0, 0.4)',
							backgroundColor: '#ffffff',
						}}
					/>

					<InputLabel htmlFor="signup-password" sx={{ color: '#eeeeee', fontSize: '20px', textAlign: 'left' }}>
						Password
					</InputLabel>
					<InputBase
						id="signup-password"
						placeholder="Password"
						value={regPassword}
						type={showPassword ? 'text' : 'password'}
						onChange={(e) => {
							setRegPassword(e.target.value.trim());
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
					<Typography id="submitMessage" variant="h6" sx={{ color: 'red', mb: 5 }}>
						{signupErrorMessage}
					</Typography>
				</Box>
				<Button
					color="button"
					variant="contained"
					size="large"
					disabled={regUsername === '' || regEmail === '' || regPassword === '' ? true : false}
					onClick={signup}
				>
					Signup
				</Button>
			</Box>
		</Layout>
	);
}
