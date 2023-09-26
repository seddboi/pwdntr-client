import { Typography, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../App';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export function Error404() {
	const navigate = useNavigate();

	return (
		<ThemeProvider theme={theme}>
			<Typography variant="h4" color="white" sx={{ textAlign: 'left', m: 6 }}>
				Error 404: Page not found...
			</Typography>
			<Button
				variant="contained"
				onClick={() => {
					navigate('/', { replace: true });
				}}
				color="button"
			>
				Home
			</Button>
		</ThemeProvider>
	);
}
