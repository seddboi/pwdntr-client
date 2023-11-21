import React from 'react';
import { Typography, Box } from '@mui/material';
import { Layout } from '../layout/layout.js';
import { GeneratorComp } from '../../components/GeneratorComp/generatorcomp';

import './home.css';

export function Home() {
	return (
		<Layout>
			<Box component="main">
				<Typography className="subhead-title" variant="h5" sx={{ mt: 3, fontSize: '20px', color: '#eeeeee' }}>
					Password Generator
				</Typography>
				<GeneratorComp />
			</Box>
		</Layout>
	);
}
