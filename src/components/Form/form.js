import React, { useState } from 'react';
import {
	Container,
	Box,
	FormGroup,
	FormControlLabel,
	InputBase,
	Checkbox,
	Button,
	Typography,
	Dialog,
	DialogTitle,
} from '@mui/material';
import { Popup } from '../Popup/popup';
import { usePasswordRandomizer } from '../../hooks/usePasswordRandomizer';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import '../Form/form.css';
import { APP_URL } from '../../App';

export function Form() {
	const [isOpen, setisOpen] = useState(false);
	const [entryUsername, setEntryUsername] = useState('');
	const [password, setPassword] = useState('');
	const [entryWebsite, setEntryWebsite] = useState('');
	const [characterEntry, setCharacterEntry] = useState('');
	const [isUppercase, setIsUppercase] = useState(false);
	const [isLowercase, setIsLowercase] = useState(false);
	const [isNumbers, setIsNumbers] = useState(false);
	const [isSpecial, setIsSpecial] = useState(false);
	const [isSubmitClicked, setIsSubmitClicked] = useState(false);

	const dayjs = require('dayjs');
	const location = useLocation();
	const currentDate = dayjs().format('MM/DD/YYYY');

	const addPassword = async () => {
		await Axios.post(
			APP_URL + '/add',
			{
				userID: location.state.user.id,
				username: entryUsername,
				password: password,
				timeCreated: currentDate,
				website: entryWebsite,
			},
			{
				headers: {
					Authorization: 'Bearer ' + sessionStorage.getItem('aT'),
				},
			}
		);
	};

	const handleClickOpen = () => {
		setIsSubmitClicked(false);
		setisOpen(!isOpen);
		setPassword(randomPass);
	};

	const handleClickClose = () => {
		setisOpen(!isOpen);
		setCharacterEntry('');
		// textInput.value = '';
		setIsUppercase(false);
		setIsLowercase(false);
		setIsNumbers(false);
		setIsSpecial(false);
	};

	const errorPopup = (
		<Dialog open={isOpen} onClose={handleClickClose}>
			<DialogTitle>Please enter a value greater tha zero and select at least one option.</DialogTitle>
		</Dialog>
	);

	const successPopup = (
		<Popup
			handleClickClose={handleClickClose}
			isOpen={isOpen}
			password={password}
			addPassword={addPassword}
			entryUsername={entryUsername}
			setEntryUsername={setEntryUsername}
			setEntryPassword={setPassword}
			entryWebsite={entryWebsite}
			setEntryWebsite={setEntryWebsite}
			isSubmitClicked={isSubmitClicked}
			setIsSubmitClicked={setIsSubmitClicked}
		/>
	);

	const popupSwitcher = () => {
		if (characterEntry <= 0 || characterEntry === '' || (!isUppercase && !isLowercase && !isNumbers && !isSpecial)) {
			return errorPopup;
		} else {
			return successPopup;
		}
	};

	const randomPass = usePasswordRandomizer(parseInt(characterEntry), isUppercase, isLowercase, isNumbers, isSpecial);

	return (
		<Container>
			<FormGroup>
				<InputBase
					id="number-input"
					placeholder="How many characters?"
					type="number"
					inputProps={{ min: 0 }}
					color="primary"
					value={characterEntry}
					onChange={(e) => {
						setCharacterEntry(e.target.value);
					}}
					sx={{
						py: '5px',
						px: 2,
						mb: 2,
						border: '1px solid rgba(0, 0, 0, 0.4)',
						backgroundColor: '#ffffff',
					}}
				/>
				<FormControlLabel
					control={
						<Checkbox
							color="button"
							size="large"
							onChange={() => {
								setIsUppercase(!isUppercase);
							}}
							checked={isUppercase}
							sx={{ color: '#D3D3D3' }}
						/>
					}
					label={
						<Typography variant="button" sx={{ color: '#eeeeee' }}>
							Uppercase Letters
						</Typography>
					}
					sx={{ mb: 3 }}
				/>
				<FormControlLabel
					control={
						<Checkbox
							color="button"
							size="large"
							onChange={() => {
								setIsLowercase(!isLowercase);
							}}
							checked={isLowercase}
							sx={{ color: '#D3D3D3' }}
						/>
					}
					label={
						<Typography variant="button" sx={{ color: '#eeeeee' }}>
							Lowercase Letters
						</Typography>
					}
					sx={{ mb: 3 }}
				/>
				<FormControlLabel
					control={
						<Checkbox
							color="button"
							size="large"
							onChange={() => {
								setIsNumbers(!isNumbers);
							}}
							checked={isNumbers}
							sx={{ color: '#D3D3D3' }}
						/>
					}
					label={
						<Typography variant="button" sx={{ color: '#eeeeee' }}>
							Numbers
						</Typography>
					}
					sx={{ mb: 3 }}
				/>
				<FormControlLabel
					control={
						<Checkbox
							color="button"
							size="large"
							onChange={() => {
								setIsSpecial(!isSpecial);
							}}
							checked={isSpecial}
							sx={{ color: '#D3D3D3' }}
						/>
					}
					label={
						<Typography variant="button" sx={{ color: '#eeeeee' }}>
							Special Characters
						</Typography>
					}
					sx={{ mb: 3 }}
				/>
			</FormGroup>
			<Box className="bottom-section">
				<Container>
					<Button className="gobutton" variant="contained" color="button" size="large" onClick={handleClickOpen}>
						Generate
					</Button>
				</Container>
				{popupSwitcher()}
			</Box>
		</Container>
	);
}
