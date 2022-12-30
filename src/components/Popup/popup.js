import React, { useState } from 'react';
import {
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	TextField,
	Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation } from 'react-router-dom';
import '../Popup/popup.css';

export function Popup({ handleClickClose, isOpen, password, isSubmitClicked, setIsSubmitClicked, addPassword, setEntryUsername, setEntryPassword, setEntryWebsite }) {
	const [isCopied, setIsCopied] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	const loggedIn = useLocation().state?.status;

	const copyPassword = () => {
		let target = document.getElementById('password-text');
		target.select();
		target.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(target.value);

		setIsCopied(true);
	};

	const passwordContainer =
		password === '' ? (
			<div></div>
		) : (
			<TextField
				id="password-text"
				type="text"
				color="success"
				margin="normal"
				fullWidth
				value={password}
				inputProps={{ readOnly: true }}
			/>
		);

	const iconSwitcher = isCopied ? <CheckIcon /> : <ContentCopyIcon />;

	const copyButtonHider =
		password === '' ? (
			<div></div>
		) : (
			<Button variant='contained' onClick={copyPassword}>
				{iconSwitcher}
			</Button>
		);

		const savePasswordPopup = 
		!isClicked ? (
			<Dialog open={isOpen} fullWidth>
				<DialogTitle sx={{ color: '#000000' }}>Your new password:</DialogTitle>
				<DialogContent>
					{passwordContainer}
					<DialogActions>
						{copyButtonHider}
						{loggedIn !== undefined ? 
						(<Button 
							variant='contained' 
							onClick={() => {
								setIsClicked(true);
						}}> Save</Button>)
						: 
						(<div></div>)} 
						<Button
							variant='contained'
							onClick={() => {
								setEntryPassword(password);
								setIsCopied(false);
								handleClickClose();

							}}
						>Close</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		) : (
			<Dialog open={isClicked} fullWidth>
				<DialogContent>
					<TextField 
						id='website-field'
						type='text'
						margin='normal'
						label='What username will you (possibly) use?'
						fullWidth
						onChange={(e) => {setEntryUsername(e.target.value.trim())}}
					/>
					<TextField 
						id='website-field'
						type='text'
						margin='normal'
						label='Where will this password be used?'
						fullWidth
						onChange={(e) => {setEntryWebsite(e.target.value.trim())}}
					/>
					<Typography variant='p'>Don't worry... you'll be able to change this later.</Typography>
					<DialogActions>
						<Button
							variant='contained'
							onClick={() => {
								addPassword(password);
								setIsClicked(false);
								setIsSubmitClicked(true);
								handleClickClose()
;							}}
						>Submit</Button>
						<Button
							variant='contained'
							onClick={() => {
								handleClickClose();
								setIsClicked(false);
							}}
						>Close</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		)

	if (!isSubmitClicked) {
		return (
			<Container>
				{savePasswordPopup}
			</Container>
		)
	} else {
		return(
			<Container></Container>
		)
	}
}
