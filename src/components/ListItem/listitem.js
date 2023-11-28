import React, { useState } from 'react';
import {
	Container,
	Grid,
	ListItemButton,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	InputBase,
	InputLabel,
	Box,
} from '@mui/material';
import { ExpandMore, ExpandLess, Close, Check } from '@mui/icons-material';
import { Dropdown } from '../ListItemDropdown/listitemdropdown';
import './listitem.css';

export function PasswordItem({ item, index, setSelectedPassID, selectedButton, setSelectedButton, handleUpdate, handleDelete }) {
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
		setTimeout(() => setShowPassword(false), 7000);
	};

	const handleDialogOpen = (e) => {
		const passID = e.currentTarget.getAttribute('passwordid');
		const buttonTitle = e.currentTarget.getAttribute('id');

		setSelectedPassID(parseInt(passID));
		setSelectedButton(buttonTitle);
		setIsDialogOpen(true);
	};

	const handleDialogClose = () => {
		setIsDialogOpen(false);
	};

	const editOrDelete =
		selectedButton === 'edit' ? (
			<Dialog open={isDialogOpen} fullWidth>
				<DialogTitle sx={{ fontSize: { xs: '20px', sm: '18px' } }}>
					Enter your new values. Any changes made will be updated.
				</DialogTitle>
				<DialogContent>
					<InputLabel htmlFor="pass-website" sx={{ color: 'container.contrastText' }}>
						Website
					</InputLabel>
					<InputBase
						id="pass-website"
						defaultValue={item.website}
						onChange={(e) => setEditedWebsite(e.target.value)}
						fullWidth
						sx={{
							mb: 3,
							px: 1,
							py: '5px',
							border: '1px solid rgba(0, 0, 0, 0.4)',
							borderRadius: '8px',
							backgroundColor: '#F8F8FF',
							boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
						}}
					/>

					<InputLabel htmlFor="pass-username" sx={{ color: 'container.contrastText' }}>
						Username
					</InputLabel>
					<InputBase
						id="pass-username"
						defaultValue={item.username}
						onChange={(e) => setEditedUsername(e.target.value)}
						fullWidth
						sx={{
							mb: 3,
							px: 1,
							py: '5px',
							border: '1px solid rgba(0, 0, 0, 0.4)',
							borderRadius: '8px',
							backgroundColor: '#F8F8FF',
							boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
						}}
					/>

					<InputLabel htmlFor="pass-password" sx={{ color: 'container.contrastText' }}>
						Password
					</InputLabel>
					<InputBase
						id="pass-password"
						defaultValue={item.password}
						onChange={(e) => setEditedPassword(e.target.value)}
						fullWidth
						sx={{
							mb: 3,
							px: 1,
							py: '5px',
							border: '1px solid rgba(0, 0, 0, 0.4)',
							borderRadius: '8px',
							backgroundColor: '#F8F8FF',
							boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="button"
						disabled={
							item.website === editedWebsite && item.username === editedUsername && item.password === editedPassword
								? true
								: false
						}
						onClick={() => {
							handleUpdate(editedWebsite, editedUsername, editedPassword);
							handleDialogClose();
						}}
					>
						<Check />
					</Button>
					<Button
						variant="contained"
						color="button"
						onClick={() => {
							handleDialogClose();
						}}
					>
						<Close />
					</Button>
				</DialogActions>
			</Dialog>
		) : (
			<Dialog open={isDialogOpen} fullWidth>
				<DialogTitle sx={{ color: 'container.contrastText' }}>Are you sure you want to remove this entry?</DialogTitle>
				<DialogActions>
					<Button
						variant="contained"
						color="button"
						onClick={() => {
							handleDelete();
							handleDialogClose();
						}}
					>
						<Check />
					</Button>
					<Button
						variant="contained"
						color="button"
						onClick={() => {
							handleDialogClose();
						}}
					>
						<Close />
					</Button>
				</DialogActions>
			</Dialog>
		);

	return (
		<Box>
			<Container id="item-container" key={index}>
				<Grid container direction="row" justifyContent="center" alignItems="center">
					<ListItemButton
						id="list-button"
						sx={{
							display: 'flex',
							boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.24)',
							height: '50px',
							mb: 2,
							borderRadius: '30px',
							bgcolor: 'item.main',
							transition: 'background-color',
							transitionDuration: '250ms',
							'&:hover': {
								bgcolor: 'item.dark',
							},
						}}
						onClick={handleCollapseOpen}
					>
						<Typography
							variant="h5"
							sx={{ textAlign: 'left', flexGrow: 1, color: 'container.contrastText', fontSize: { xs: '20px', sm: '15px' } }}
						>
							{item.website}
						</Typography>
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
				</Grid>
				<Dropdown
					item={item}
					index={index}
					open={open}
					showPassword={showPassword}
					handleVisibility={handleVisibility}
					handleDialogOpen={handleDialogOpen}
				/>
			</Container>
			{editOrDelete}
		</Box>
	);
}
