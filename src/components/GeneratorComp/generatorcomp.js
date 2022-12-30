import React from 'react';
import { Box } from '@mui/material';
import { Form } from '../Form/form.js';

export function GeneratorComp({theme}) {

	return (
		<Box sx={{backgroundColor: '#B3B6B7'}}>
			<Box className="top-section" component='main' sx={{ mt: 5, mb: 5 }}>
			</Box>
			<Form theme={theme} />
		</Box>
	)
};