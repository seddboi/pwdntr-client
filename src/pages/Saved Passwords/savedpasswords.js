import React, {useState, useEffect} from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, List, LinearProgress, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Check, Menu } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../App';
import { SideMenu } from '../../components/SideMenu/sidemenu';
import { SearchBar } from '../../components/SearchBar/searchbar';
import { PasswordItem } from '../../components/ListItem/listitem';
import { useLocation } from 'react-router';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Axios from 'axios';

export function SavedPasswords() {
	const [open, setOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [collection, setCollection] = useState([]);
	const [selectedPassID, setSelectedPassID] = useState(null);
	const [selectedButton, setSelectedButton] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [customSite, setCustomSite] = useState('');
	const [customUser, setCustomUser] = useState('');
	const [customPass, setCustomPass] = useState('');


	const location = useLocation();
	const { promiseInProgress } = usePromiseTracker();
	const dayjs = require('dayjs');
	const currentDateAndTime = dayjs().format('MM/DD/YYYY hh:mm');

	function fetchCollection() {
		trackPromise(
			Axios.get(`http://localhost:3001/saved/${location.state.user.id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('aT'),
				}
			}).then((data) => setCollection(data.data))
		); 
	};

	const addCustomPassword = async () => {
		await Axios.post('http://localhost:3001/add', {
			userID: location.state.user.id,
			username: customUser,
			password: customPass,
			timeCreated: currentDateAndTime,
			website: customSite
		}, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('aT'),
			}
		});

		fetchCollection();
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
	}

	const handleUpdate = (website, username, password) => {
		Axios.put(`http://localhost:3001/saved/${location.state.user.id}/${selectedPassID}`, {
			website: website,
			username: username,
			password: password
		}, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('aT'),
			}
		});

		fetchCollection();
	};

	const handleDelete = () => {
		Axios.delete(`http://localhost:3001/saved/${location.state.user.id}/${selectedPassID}`, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('aT'),
			}
		});

		fetchCollection();
	};

	const handleDrawer = () => {
		setOpen(!open);
	};

	const noDataComp = (
		<Typography variant='h2' sx={{color: '#ffffff'}}>No data to show.</Typography>
	);
	
	const dataComp = (
		<Box sx={{width: '100%', maxWidth: '750px'}}>
			<List id='listed-passwords' sx={{width: '100%', maxWidth: '750px', maxHeight:'65vh', overflow: 'scroll', bgcolor: 'white', border:'2px solid #17202A', borderRadius: '15px'}}>
				<SearchBar setSearchText={setSearchText} />
				{/* eslint-disable-next-line */
				collection.filter((item) => {
					if (searchText === '') {
						return item;
					} else if (item.website.toLowerCase().includes(searchText.toLowerCase())) {
						return item;
					}
				}).map((item) => <PasswordItem item={item} index={item.passwordID} selectedPassId={selectedPassID} setSelectedPassID={setSelectedPassID} selectedButton={selectedButton} setSelectedButton={setSelectedButton} handleUpdate={handleUpdate} handleDelete={handleDelete} key={item.passwordID}/>)}
			</List>
		</Box>
	);

	const loading = (
		<List id='listed-passwords' sx={{width: '100%', maxWidth: '750px', maxHeight:'65vh', overflow: 'scroll', bgcolor: 'white', border:'2px solid #17202A', borderRadius: '15px'}}>
			<LinearProgress color='primary' />
		</List>
	)

	const isEmpty = collection.length > 0 ? dataComp : noDataComp;

	// eslint-disable-next-line
	useEffect(() => fetchCollection(), []);

	return (
		<ThemeProvider theme={theme}>
			<Box component='nav' sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton onClick={handleDrawer} size='large'>
							<Menu fontSize='large' sx={{color: 'white'}}/>
						</IconButton>
						<SideMenu open={open} onClose={handleDrawer} isHome={false}/>
						<Typography variant='h4' sx={{ml: 2, mr: 2, flexGrow: 1, textAlign: {xs: 'center', sm: 'start'}}}>Saved Passwords</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box component='main' sx={{mb: 6}}>
				{collection.length > 0 ? <Typography variant='h5' sx={{mt: 3, color: '#ffffff'}}>Use the search bar below to filter!</Typography> : <div></div>}
				<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 3, ml: 2, mr: 2}}>
					{promiseInProgress ? loading : isEmpty}
				</Box>
				<Box>
					<Button color='primary' variant='contained' onClick={() => setIsDialogOpen(true)}>Custom Entry</Button>
					<Dialog open={isDialogOpen}>
						<DialogTitle sx={{color: '#ffffff'}}>Fill the form below and click the check to submit.</DialogTitle>
						<DialogContent>
							<TextField fullWidth color='primary' onChange={(e) => setCustomSite(e.target.value.trim())} label='What website will this be for?' sx={{mt: 2, mb: 1}}/>
							<TextField fullWidth color='primary' onChange={(e) => setCustomUser(e.target.value.trim())} label='What username will you be using?' sx={{mt: 2, mb: 2}}/>
							<TextField fullWidth color='primary' onChange={(e) => setCustomPass(e.target.value.trim())} label='What password will you be using?' sx={{mt: 2, mb: 2}}/>
						</DialogContent>
						<DialogActions>
						<Button variant='contained' onClick={() => {
							addCustomPassword();
							handleDialogClose();
						}}>
							<Check fontSize='medium'/>
						</Button>
						<Button variant='contained' onClick={() => {handleDialogClose()}}>Cancel</Button>
						</DialogActions>
					</Dialog>
				</Box>
			</Box>
		</ThemeProvider>
	)
};