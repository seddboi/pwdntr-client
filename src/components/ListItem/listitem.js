import React, {useState} from 'react';
import { Container, Grid, ListItemButton, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { ExpandMore, ExpandLess, Check } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../App';
import { Dropdown } from '../ListItemDropdown/listitemdropdown';
import './listitem.css';

export function PasswordItem({item, index, setSelectedPassID, selectedButton, setSelectedButton, handleUpdate, handleDelete}) {
	const [open, setOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editedWebsite, setEditedWebsite] = useState(item.website);
	const [editedUsername, setEditedUsername] = useState(item.username);
	const [editedPassword, setEditedPassword] = useState(item.password);

	const handleCollapseOpen = () => {
		setOpen(!open);
	};

	const handleVisibility = () => {
		setShowPassword(true);
		switchBackVisibility();
	};

	const switchBackVisibility = () => {
		setTimeout(() => setShowPassword(false), 10000);
	}

	const handleDialogOpen = (e) => {
		const passID = e.currentTarget.parentNode.getAttribute('passwordid');
		const buttonTitle = e.currentTarget.getAttribute('id');

		setSelectedPassID(parseInt(passID));
		setSelectedButton(buttonTitle);
		setIsDialogOpen(true);
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
	};

	const editOrDelete = selectedButton === 'edit' ? (
		<Dialog open={isDialogOpen} fullWidth>
			<DialogTitle sx={{color: '#ffffff'}}>Enter your new preferences below!</DialogTitle>
			<DialogContent>
				<TextField variant='outlined' color='primary' label='Website Used' defaultValue={item.website} onChange={(e) => setEditedWebsite(e.target.value)} fullWidth sx={{mt: 2, mb: 1}}/>
				<TextField variant='outlined' color='primary' label='Username Used' defaultValue={item.username} onChange={(e) => setEditedUsername(e.target.value)} fullWidth sx={{mt: 2, mb: 1}}/>
				<TextField variant='outlined' color='primary' label='Password Used' defaultValue={item.password} onChange={(e) => setEditedPassword(e.target.value)} fullWidth sx={{mt: 2, mb: 2}}/>
				<DialogContentText sx={{color: 'red'}}>** Any changes submitted will be updated! **</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={() => {
					handleUpdate(editedWebsite, editedUsername, editedPassword);
					handleDialogClose();
					}}>
					<Check fontSize='medium'/>
				</Button>
				<Button variant='contained' onClick={() => {handleDialogClose()}}>Cancel</Button>
			</DialogActions>
		</Dialog>
	) : (
		<Dialog open={isDialogOpen} fullWidth>
			<DialogTitle sx={{color: '#ffffff'}}>Are you sure you want to remove this entry?</DialogTitle>
			<DialogActions>
				<Button variant='contained' onClick={() => {
					handleDelete();
					handleDialogClose();
					}}>
					<Check fontSize='medium'/>
				</Button>
				<Button variant='contained' onClick={() => {handleDialogClose()}}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<ThemeProvider theme={theme}>
			<Container id='item-container' key={index}>
				<Grid container direction='row' justifyContent='center' alignItems='center'>
					<ListItemButton id='list-button' sx={{display: 'flex', backgroundColor:'#F7F9F9', borderBottom:'solid 1px lightgrey', borderRadius: '30px', height: '50px', mt: 2, mb: 2}} onClick={handleCollapseOpen}>
						<Typography variant='h5' sx={{textAlign: 'center', flexGrow: 1, color: '#17202A'}}>{item.website}</Typography>
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
				</Grid>
				<Dropdown item={item} index={index} open={open} showPassword={showPassword} handleVisibility={handleVisibility} handleDialogOpen={handleDialogOpen}/>
			</Container>
			{editOrDelete}
		</ThemeProvider>
	)
};