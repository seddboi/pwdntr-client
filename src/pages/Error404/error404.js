import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export function Error404() {
	const navigate = useNavigate();

	return (
		<Box>
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
		</Box>
	);
}
