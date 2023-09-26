import React from 'react';
import { Box } from '@mui/material';
import { Form } from '../Form/form.js';

export function GeneratorComp({ theme }) {
	return (
		<Box>
			<Box className="top-section" component="main" sx={{ mb: 2 }}></Box>
			<Form theme={theme} />
		</Box>
	);
}
