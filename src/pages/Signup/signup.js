import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Box, AppBar, Toolbar, TextField, Typography, Button, IconButton, InputAdornment } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { APP_URL, theme } from '../../App'
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function Signup() {

	const [regUsername, setRegUsername] = useState('');
	const [regPassword, setRegPassword] = useState('');
	const [showPassword ,setShowPassword] = useState(false);
	const [regEmail, setRegEmail] = useState('');
	const [loginStatus, setLoginStatus] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [signupErrorMessage, setSignupErrorMessage] = useState('');
	const [signupError, setSignupError] = useState(false);

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
			localStorage.setItem('aT', JSON.stringify(res.data.token));
			setLoginStatus(res.data.auth);
			setUserInfo(res.data.result);
		} else {
			setSignupErrorMessage(res.data.message);
			setSignupError(true);
		}
	})};

	useEffect(() => {
		if (loginStatus) {
			navigate('/home', {state: {status: loginStatus, user: userInfo}, replace: true} );
		};
		// eslint-disable-next-line
	}, [loginStatus]);

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
				<Box component='nav' sx={{ flexGrow: 1, margin: 0, width: '100%' }}>
					<AppBar position='static'>
						<Toolbar>
							<Typography variant='h4'  sx={{display: {xs: 'none', sm:'block'}, flexGrow:1, textAlign:'start', letterSpacing: {xs: 'none', sm: '0.4em',md:'0.6em'}}}>Passwordinator</Typography>
							<Button color='inherit' onClick={() => {navigate('/')}}>Generator</Button>
							<Button color='inherit' onClick={() => {navigate('/login')}}>Login</Button>
						</Toolbar>
					</AppBar>
				</Box>
				<Box component='form' sx={{display: 'flex', flexDirection: 'column', width: '90%',maxWidth: '500px', margin: 4}}>
					<Typography variant='h2' color='#ffffff' sx={{mb: '70px'}}>Signup Below!</Typography>
					<TextField label="Username" variant="outlined" onChange={(e) => {setRegUsername(e.target.value)}} sx={{mt: 2, mb: 2}}/>
					<TextField label="Email" variant="outlined" error={signupError} onChange={(e) => {setRegEmail(e.target.value)}} sx={{mt: 2, mb: 2}}/>		
					<TextField label="Password" type={showPassword ? 'text' : 'password'} variant="outlined" onChange={(e) => {setRegPassword(e.target.value)}} InputProps={{
						endAdornment: 
							<InputAdornment position='end'>
								<IconButton onClick={handleVisibility}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
					}} sx={{mt: 2, mb: 2}}/>	
					<Typography id='submitMessage' variant='h6' sx={{color: 'red', mb: 8}}>{signupErrorMessage}</Typography>
				</Box>
				<Button color='primary' variant='contained' size='large' onClick={signup}>Signup</Button>
			</Box>
		</ThemeProvider>
	)
};
