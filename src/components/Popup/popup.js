import React, { useState } from 'react';
import { Container, Dialog, DialogActions, DialogContent, Button, InputBase, InputLabel } from '@mui/material';
import { ContentCopy, Check, Replay, Close, SaveAlt } from '@mui/icons-material';
import '../Popup/popup.css';

export function Popup({
	handleClickClose,
	isOpen,
	randomPass,
	password,
	setPassword,
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

	const loggedIn = sessionStorage.getItem('_a');

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
					borderRadius: '8px',
					backgroundColor: '#ffffff',
					boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
				}}
			/>
		);

	const iconSwitcher = isCopied ? <Check /> : <ContentCopy />;

	const copyButtonHider = (
		<Button color="button" variant="contained" onClick={copyPassword}>
			{iconSwitcher}
		</Button>
	);

	const savePasswordPopup = !isClicked ? (
		<Dialog open={isOpen} fullWidth>
			<DialogContent>
				{passwordContainer}
				<DialogActions sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
					<Button
						color="button"
						variant="contained"
						onClick={() => {
							setPassword(randomPass);
						}}
					>
						<Replay />
					</Button>
					{copyButtonHider}
					{loggedIn !== undefined ? (
						<Button
							color="button"
							variant="contained"
							onClick={() => {
								setIsClicked(true);
							}}
						>
							<SaveAlt />
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
						<Close />
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	) : (
		<Dialog open={isClicked} fullWidth>
			<DialogContent>
				<InputLabel htmlFor="associated-username" sx={{ fontSize: { xs: '20px', sm: '15px' }, color: 'container.contrastText' }}>
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
						borderRadius: '8px',
						backgroundColor: '#ffffff',
						boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
					}}
				/>

				<InputLabel htmlFor="associated-website" sx={{ fontSize: { xs: '20px', sm: '15px' }, color: 'container.contrastText' }}>
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
						borderRadius: '8px',
						backgroundColor: '#ffffff',
						boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
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
						<SaveAlt />
					</Button>
					<Button
						color="button"
						variant="contained"
						onClick={() => {
							handleClickClose();
							setIsClicked(false);
						}}
					>
						<Close />
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
