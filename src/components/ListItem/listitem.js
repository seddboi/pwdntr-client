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
} from '@mui/material';
import { ExpandMore, ExpandLess, Check } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../App';
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
		const passID = e.currentTarget.parentNode.getAttribute('passwordid');
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
					<InputLabel htmlFor="pass-website">Website</InputLabel>
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
							backgroundColor: '#F8F8FF',
						}}
					/>
					<InputLabel htmlFor="pass-username">Username</InputLabel>
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
							backgroundColor: '#F8F8FF',
						}}
					/>
					<InputLabel htmlFor="pass-password">Password</InputLabel>
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
							backgroundColor: '#F8F8FF',
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="button"
						onClick={() => {
							handleUpdate(editedWebsite, editedUsername, editedPassword);
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
		) : (
			<Dialog open={isDialogOpen} fullWidth>
				<DialogTitle sx={{ color: '#181818' }}>Are you sure you want to remove this entry?</DialogTitle>
				<DialogActions>
					<Button
						variant="contained"
						color="button"
						onClick={() => {
							handleDelete();
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
		);

	return (
		<ThemeProvider theme={theme}>
			<Container id="item-container" key={index}>
				<Grid container direction="row" justifyContent="center" alignItems="center">
					<ListItemButton
						id="list-button"
						sx={{
							display: 'flex',
							boxShadow: '0 3px 3px #000',
							height: '50px',
							mb: 2,
							borderRadius: '30px',
							bgcolor: '#F8F8FF',
							'&:hover': {
								bgcolor: '#c6c6cc',
							},
						}}
						onClick={handleCollapseOpen}
					>
						<Typography variant="h5" sx={{ textAlign: 'left', flexGrow: 1, color: '#17202A', fontSize: '20px' }}>
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
		</ThemeProvider>
	);
}
