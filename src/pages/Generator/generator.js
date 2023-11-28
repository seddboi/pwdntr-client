import React from 'react';
import { Typography, Box } from '@mui/material';
import { Layout } from '../layout/layout.js';
import { Form } from '../../components/Form/form';
import './generator.css';

export function Generator() {
	return (
		<Layout>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box
					sx={{
						maxWidth: '800px',
						width: '100%',
						mt: { xs: 3, sm: 5 },
						mx: 2,
						p: { xs: 2, sm: 5 },
						borderRadius: '8px',
						boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
						bgcolor: 'container.main',
					}}
				>
					<Box className="top-section" component="main" sx={{ my: 5, mx: 2 }}>
						<Typography
							className="subhead-title prevent-select"
							variant="h4"
							sx={{ fontSize: '40px', color: 'container.contrastText' }}
						>
							PASSWORD RANDOMIZER
						</Typography>
					</Box>
					<Form />
				</Box>
			</Box>
		</Layout>
	);
}
