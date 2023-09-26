import React from 'react';
import { Box, InputBase } from '@mui/material';

import './searchbar.css';

export function SearchBar({ setSearchText }) {
	return (
		<Box sx={{ mt: 3, position: 'sticky', zIndex: '1', top: '10px' }}>
			<InputBase
				onChange={(e) => setSearchText(e.target.value)}
				fullWidth
				placeholder="Search..."
				sx={{
					py: '5px',
					px: 2,
					maxWidth: '600px',
					color: 'primary',
					border: '1px solid rgba(0, 0, 0, 0.4)',
					backgroundColor: '#ffffff',
				}}
			/>
		</Box>
	);
}
