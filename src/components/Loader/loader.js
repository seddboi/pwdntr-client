import React from 'react';
import { Box } from '@mui/material';
import './loader.css';

export function Loader() {
	return (
		<Box
			className="spinning-loader"
			sx={{
				width: '50px',
				height: '50px',
				m: 4,
				border: '8px solid #bbc1c7',
				borderTop: '8px solid #99a2ab',
				borderRadius: '50%',
			}}
		></Box>
	);
}
