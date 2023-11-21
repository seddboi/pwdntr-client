import React from 'react';
import { Typography, Box } from '@mui/material';
import { Layout } from '../layout/layout.js';
import { Form } from '../../components/Form/form';
import './generator.css';

export function Generator() {
	return (
		<Layout>
			<Box className="top-section" component="main" sx={{ mt: 5, mb: 5 }}>
				<Typography className="subhead-title" variant="h5" sx={{ fontSize: '20px', color: '#eeeeee' }}>
					Enter your preferences below and press go!
				</Typography>
			</Box>
			<Form />
		</Layout>
	);
}
