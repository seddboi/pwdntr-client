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
	DialogActions,
	InputLabel,
	InputBase,
} from '@mui/material';
import { Check, Menu } from '@mui/icons-material';
import { APP_URL } from '../../App';
import { SideMenu } from '../../components/SideMenu/sidemenu';
import { EmptyComp } from '../../components/EmptyComp/emptyComp';
import { PasswordEntriesDiv } from '../../components/PasswordEntries/passwordEntries';
import { Loader } from '../../components/Loader/loader';
import { useLocation } from 'react-router';
import Axios from 'axios';
import './savedpasswords.css';

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
				Authorization: 'Bearer ' + sessionStorage.getItem('aT'),
			},
		})
			.then((data) => {
				setCollection(data.data);
			})
			.then(() => setIsLoading(false));
		/* eslint-disable-next-line */
	}, []);

	const addCustomPassword = () => {
		Axios.post(
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
					Authorization: 'Bearer ' + sessionStorage.getItem('aT'),
				},
			}
		).then(() => {
			fetchCollection();
		});
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
					Authorization: 'Bearer ' + sessionStorage.getItem('aT'),
				},
			}
		).then(() => {
			fetchCollection();
		});
	};

	const handleDelete = () => {
		Axios.delete(APP_URL + `/saved/${location.state.user.id}/${selectedPassID}`, {
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('aT'),
			},
		}).then(() => {
			fetchCollection();
		});
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
	}, []);

	return (
		<Box>
			<Box component="nav" sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton onClick={handleDrawer} size="large">
							<Menu fontSize="large" sx={{ color: 'white' }} />
						</IconButton>
						<SideMenu open={open} onClose={handleDrawer} isHome={false} />
						<Typography
							variant="h5"
							sx={{
								mx: 2,
								flexGrow: 1,
								fontSize: '25px',
								textAlign: { xs: 'center', sm: 'start' },
							}}
						>
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
						mb: 3,
					}}
				>
					{isLoading ? <Loader /> : isEmpty}
				</Box>
				<Box>
					<Button color="button" variant="contained" disabled={isLoading ? true : false} onClick={() => setIsDialogOpen(true)}>
						Custom Entry
					</Button>
					<Dialog open={isDialogOpen}>
						<DialogTitle>Fill the form below and click the check to submit.</DialogTitle>
						<DialogContent>
							<InputLabel htmlFor="input-custom-website" sx={{ color: '#eeeeee', fontSize: '20px' }}>
								What website will this be for?
							</InputLabel>
							<InputBase
								id="input-custom-website"
								fullWidth
								onChange={(e) => setCustomSite(e.target.value.trim())}
								placeholder="Youtube/Facebook/etc."
								sx={{ mb: 3, px: 1, py: '5px', border: '1px solid rgba(0, 0, 0, 0.4)', backgroundColor: '#F8F8FF' }}
							/>

							<InputLabel htmlFor="input-custom-username" sx={{ color: '#eeeeee', fontSize: '20px' }}>
								What username will you be using?
							</InputLabel>
							<InputBase
								id="input-custom-username"
								fullWidth
								onChange={(e) => setCustomUser(e.target.value.trim())}
								placeholder="johndoe123"
								sx={{ mb: 3, px: 1, py: '5px', border: '1px solid rgba(0, 0, 0, 0.4)', backgroundColor: '#F8F8FF' }}
							/>

							<InputLabel htmlFor="input-custom-password" sx={{ color: '#eeeeee', fontSize: '20px' }}>
								What password will you be using?
							</InputLabel>
							<InputBase
								id="input-custom-password"
								fullWidth
								onChange={(e) => setCustomPass(e.target.value.trim())}
								placeholder="randompass123"
								sx={{ mb: 3, px: 1, py: '5px', border: '1px solid rgba(0, 0, 0, 0.4)', backgroundColor: '#F8F8FF' }}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								variant="contained"
								color="button"
								disabled={customUser === '' || customSite === '' || customPass === '' ? true : false}
								onClick={() => {
									addCustomPassword();
									handleDialogClose();
								}}
							>
								<Check fontSize="medium" />
							</Button>
							<Button
								variant="contained"
								color="button"
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
		</Box>
	);
}
