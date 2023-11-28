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
					borderRadius: '8px',
					backgroundColor: '#ffffff',
					boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
				}}
			/>
		</Box>
	);
}
