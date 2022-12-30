import React from 'react';
import { Box, OutlinedInput } from '@mui/material';

import './searchbar.css';

export function SearchBar({setSearchText}) {
	return (
		<Box sx={{mt: 1, pl: 2, pr: 2, position: 'sticky', zIndex: '1', top: '10px'}}>
			<OutlinedInput onChange={(e) => setSearchText(e.target.value)} fullWidth sx={{width: '100%', maxWidth: '750px', borderRadius: '16px', boxShadow: '0 3px 7px #111', color: '#1C5BB0'}}/>
		</Box>
	)
};