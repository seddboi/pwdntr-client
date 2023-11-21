import React from 'react';
import { Box } from '@mui/material';
import { Header } from './header.js';

export function Layout({ children }) {
	return (
		<Box>
			<Header />
			<Box>{children}</Box>
		</Box>
	);
}
