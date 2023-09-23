import React, { useState, useEffect, useCallback } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
} from '@mui/material';
import { Check, Menu } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { APP_URL, theme } from '../../App';
import { SideMenu } from '../../components/SideMenu/sidemenu';
import { EmptyComp } from '../../components/EmptyComp/emptyComp';
import { useLocation } from 'react-router';
import Axios from 'axios';
import './savedpasswords.css';
import { PasswordEntriesDiv } from '../../components/PasswordEntries/passwordEntries';
import { Loader } from '../../components/Loader/loader';

export function SavedPasswords() {
	const [open, setOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [collection, setCollection] = useState([]);
	const [selectedPassID, setSelectedPassID] = useState(null);
	const [selectedButton, setSelectedButton] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [customSite, setCustomSite] = useState('');
	const [customUser, setCustomUser] = useState('');
	const [customPass, setCustomPass] = useState('');

	const location = useLocation();
	const dayjs = require('dayjs');
	const currentDate = dayjs().format('MM/DD/YYYY');

	const fetchCollection = useCallback(async () => {
		await Axios.get(APP_URL + `/saved/${location.state.user.id}`, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('aT'),
			},
		})
			.then((data) => {
				setCollection(data.data);
			})
			.then(() => setIsLoading(false));
		/* eslint-disable-next-line */
	}, []);

	const addCustomPassword = async () => {
		await Axios.post(
			APP_URL + '/add',
			{
				userID: location.state.user.id,
				username: customUser,
				password: customPass,
				timeCreated: currentDate,
				website: customSite,
			},
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('aT'),
				},
			}
		);

		fetchCollection();
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
	};

	const handleUpdate = (website, username, password) => {
		Axios.put(
			APP_URL + `/saved/${location.state.user.id}/${selectedPassID}`,
			{
				website: website,
				username: username,
				password: password,
			},
			{
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('aT'),
				},
			}
		);

		fetchCollection();
	};

	const handleDelete = () => {
		Axios.delete(APP_URL + `/saved/${location.state.user.id}/${selectedPassID}`, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('aT'),
			},
		});

		fetchCollection();
	};

	const handleDrawer = () => {
		setOpen(!open);
	};

	const isEmpty =
		collection.length > 0 ? (
			<PasswordEntriesDiv
				entries={collection}
				selectedID={selectedPassID}
				setSelectedID={setSelectedPassID}
				searchText={searchText}
				setSearchText={setSearchText}
				selectedButton={selectedButton}
				setSelectedButton={setSelectedButton}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
			/>
		) : (
			<EmptyComp />
		);

	useEffect(() => {
		fetchCollection();
		/* eslint-disable-next-line */
	}, [fetchCollection, collection]);

	return (
		<ThemeProvider theme={theme}>
			<Box component="nav" sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton onClick={handleDrawer} size="large">
							<Menu fontSize="large" sx={{ color: 'white' }} />
						</IconButton>
						<SideMenu open={open} onClose={handleDrawer} isHome={false} />
						<Typography variant="h4" sx={{ ml: 2, mr: 2, flexGrow: 1, textAlign: { xs: 'center', sm: 'start' } }}>
							Saved Passwords
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box component="main" sx={{ mb: 6 }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						mt: 3,
						mb: 3,
						ml: 2,
						mr: 2,
					}}
				>
					{isLoading ? <Loader /> : isEmpty}
				</Box>
				<Box>
					<Button color="primary" variant="contained" onClick={() => setIsDialogOpen(true)}>
						Custom Entry
					</Button>
					<Dialog open={isDialogOpen}>
						<DialogTitle sx={{ color: '#ffffff' }}>Fill the form below and click the check to submit.</DialogTitle>
						<DialogContent>
							<TextField
								fullWidth
								color="primary"
								onChange={(e) => setCustomSite(e.target.value.trim())}
								label="What website will this be for?"
								sx={{ mt: 2, mb: 1 }}
							/>
							<TextField
								fullWidth
								color="primary"
								onChange={(e) => setCustomUser(e.target.value.trim())}
								label="What username will you be using?"
								sx={{ mt: 2, mb: 2 }}
							/>
							<TextField
								fullWidth
								color="primary"
								onChange={(e) => setCustomPass(e.target.value.trim())}
								label="What password will you be using?"
								sx={{ mt: 2, mb: 2 }}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								variant="contained"
								onClick={() => {
									addCustomPassword();
									handleDialogClose();
								}}
							>
								<Check fontSize="medium" />
							</Button>
							<Button
								variant="contained"
								onClick={() => {
									handleDialogClose();
								}}
							>
								Cancel
							</Button>
						</DialogActions>
					</Dialog>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
