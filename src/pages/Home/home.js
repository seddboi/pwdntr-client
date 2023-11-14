import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { GeneratorComp } from '../../components/GeneratorComp/generatorcomp';
import { SideMenu } from '../../components/SideMenu/sidemenu';

import './home.css';

export function Home() {
	const [open, setOpen] = useState(false);

	const location = useLocation();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box>
			<Box component="nav" sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton onClick={handleDrawerOpen} size="large">
							<Menu fontSize="large" sx={{ color: 'white' }} />
						</IconButton>
						<SideMenu open={open} onClose={handleDrawerClose} isHome={true} />
						<Typography
							variant="h4"
							sx={{ ml: 2, mr: 2, flexGrow: 1, textAlign: { xs: 'center', sm: 'start' }, fontSize: '25px' }}
						>
							Welcome, {location.state.user.username}
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box component="main">
				<Typography className="subhead-title" variant="h5" sx={{ mt: 3, fontSize: '20px', color: '#eeeeee' }}>
					Password Generator
				</Typography>
				<GeneratorComp />
			</Box>
		</Box>
	);
}
