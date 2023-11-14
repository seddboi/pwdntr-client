import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form/form';
import './generator.css';

export function Generator() {
	const navigate = useNavigate();
	return (
		<Box>
			<Box component="nav" sx={{ flexGrow: 1 }}>
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
								navigate('/signup');
							}}
							sx={{ fontSize: '20px' }}
						>
							Signup
						</Button>
						<Button
							color="button"
							onClick={() => {
								navigate('/login');
							}}
							sx={{ fontSize: '20px' }}
						>
							Login
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<Box className="top-section" component="main" sx={{ mt: 5, mb: 5 }}>
				<Typography className="subhead-title" variant="h5" sx={{ fontSize: '20px', color: '#eeeeee' }}>
					Enter your preferences below and press go!
				</Typography>
			</Box>
			<Form />
		</Box>
	);
}
