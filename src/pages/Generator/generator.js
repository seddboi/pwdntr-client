import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Form } from '../../components/Form/form';
import { theme } from '../../App'
import './generator.css';

export function Generator() {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{backgroundColor: '#B3B6B7'}}>
				<Box component='nav' sx={{ flexGrow: 1 }}>
					<AppBar position='static'>
						<Toolbar>
							<Typography variant='h4'  sx={{display: {xs: 'none', sm:'block'}, flexGrow:1, textAlign:'start', letterSpacing: {xs: 'none', sm: '0.4em',md:'0.6em'}}}>Passwordinator</Typography>
							<Button color='inherit'><Link to='/login' style={{textDecoration: 'none', color:'#ffffff'}}>Login</Link></Button>
							<Button color='inherit'><Link to='/signup' style={{textDecoration: 'none', color:'#ffffff'}}>Signup</Link></Button>
						</Toolbar>
					</AppBar>
				</Box>
				<Box className="top-section" component='main' sx={{ mt: 5, mb: 5 }}>
					<Typography className="subhead-title" variant="h5">
						Enter your preferences below and press go!
					</Typography>
				</Box>
				<Form theme={theme}/>
			</Box>
		</ThemeProvider>
	);
}
