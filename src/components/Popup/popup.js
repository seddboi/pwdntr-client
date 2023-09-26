import React, { useState } from 'react';
import { Container, Dialog, DialogActions, DialogContent, DialogTitle, Button, InputBase, InputLabel } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation } from 'react-router-dom';
import '../Popup/popup.css';

export function Popup({
	handleClickClose,
	isOpen,
	password,
	isSubmitClicked,
	setIsSubmitClicked,
	addPassword,
	entryUsername,
	setEntryUsername,
	setEntryPassword,
	entryWebsite,
	setEntryWebsite,
}) {
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
			<InputBase
				id="password-text"
				type="text"
				fullWidth
				value={password}
				inputProps={{ readOnly: true }}
				sx={{
					py: '5px',
					px: 2,
					mb: 2,
					border: '1px solid rgba(0, 0, 0, 0.4)',
					backgroundColor: '#ffffff',
				}}
			/>
		);

	const iconSwitcher = isCopied ? <CheckIcon /> : <ContentCopyIcon />;

	const copyButtonHider =
		password === '' ? (
			<div></div>
		) : (
			<Button color="button" variant="contained" onClick={copyPassword}>
				{iconSwitcher}
			</Button>
		);

	const savePasswordPopup = !isClicked ? (
		<Dialog open={isOpen} fullWidth>
			<DialogTitle sx={{ color: '#000000' }}>Your new password:</DialogTitle>
			<DialogContent>
				{passwordContainer}
				<DialogActions>
					{copyButtonHider}
					{loggedIn !== undefined ? (
						<Button
							color="button"
							variant="contained"
							onClick={() => {
								setIsClicked(true);
							}}
						>
							Save
						</Button>
					) : (
						<div></div>
					)}
					<Button
						color="button"
						variant="contained"
						onClick={() => {
							setEntryPassword(password);
							setIsCopied(false);
							handleClickClose();
						}}
					>
						Close
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	) : (
		<Dialog open={isClicked} fullWidth>
			<DialogContent>
				<InputLabel htmlFor="associated-username" sx={{ fontSize: '20px', color: '#eeeeee' }}>
					Associated username?
				</InputLabel>
				<InputBase
					id="associated-username"
					type="text"
					placeholder="BurgurLuvur29"
					fullWidth
					onChange={(e) => {
						setEntryUsername(e.target.value.trim());
					}}
					sx={{
						py: '5px',
						px: 2,
						mb: 2,
						border: '1px solid rgba(0, 0, 0, 0.4)',
						backgroundColor: '#ffffff',
					}}
				/>

				<InputLabel htmlFor="associated-website" sx={{ fontSize: '20px', color: '#eeeeee' }}>
					Associated website?
				</InputLabel>
				<InputBase
					id="associated-website"
					type="text"
					placeholder="Youtube/Facebook/etc."
					fullWidth
					onChange={(e) => {
						setEntryWebsite(e.target.value.trim());
					}}
					sx={{
						py: '5px',
						px: 2,
						mb: 2,
						border: '1px solid rgba(0, 0, 0, 0.4)',
						backgroundColor: '#ffffff',
					}}
				/>
				{/* <Typography variant="p"></Typography> */}
				<DialogActions>
					<Button
						color="button"
						variant="contained"
						disabled={entryUsername.trim() === '' || entryWebsite.trim() === '' ? true : false}
						onClick={() => {
							addPassword(password);
							setIsClicked(false);
							setIsSubmitClicked(true);
							handleClickClose();
						}}
					>
						Submit
					</Button>
					<Button
						color="button"
						variant="contained"
						onClick={() => {
							handleClickClose();
							setIsClicked(false);
						}}
					>
						Close
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);

	if (!isSubmitClicked) {
		return <Container>{savePasswordPopup}</Container>;
	} else {
		return <Container></Container>;
	}
}
