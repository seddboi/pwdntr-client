import React, { useState } from 'react';
import {
	Container,
	Box,
	FormGroup,
	FormControlLabel,
	TextField,
	Checkbox,
	Button,
	Typography,
	Dialog,
	DialogTitle,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Popup } from '../Popup/popup';
import { usePasswordRandomizer } from '../../hooks/usePasswordRandomizer';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import '../Form/form.css';
import { APP_URL } from '../../App';


export function Form({theme}) {
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
	const currentDateAndTime = dayjs().format('MM/DD/YYYY hh:mm');

	const addPassword = async () => {
		await Axios.post(APP_URL + '/add', {
			userID: location.state.user.id,
			username: entryUsername,
			password: password,
			timeCreated: currentDateAndTime,
			website: entryWebsite
		}, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('aT'),
			}
		})
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
			setEntryUsername={setEntryUsername}
			setEntryPassword={setPassword}
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

	const randomPass = usePasswordRandomizer(
		parseInt(characterEntry),
		isUppercase,
		isLowercase,
		isNumbers,
		isSpecial
	);

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<FormGroup>
					<TextField
						id="number-input"
						label="How many characters?"
						type="number"
						InputProps={{ inputProps: { min: 0 } }}
						color="primary"
						value={characterEntry}
						onChange={(e) => {
							setCharacterEntry(e.target.value);
						}}
						sx={{ mb: 3 }}
					/>
					<FormControlLabel
						color="primary"
						control={
							<Checkbox
								className="checkbox"
								color="primary"
								size="large"
								onChange={() => {
									setIsUppercase(!isUppercase);
								}}
								checked={isUppercase}
							/>
						}
						label={
							<Typography className="checkbox" variant="button">
								Uppercase Letters
							</Typography>
						}
						sx={{ mb: 3 }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								size="large"
								onChange={() => {
									setIsLowercase(!isLowercase);
								}}
								checked={isLowercase}
							/>
						}
						label={
							<Typography className="checkbox" variant="button">
								Lowercase Letters
							</Typography>
						}
						sx={{ mb: 3 }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								size="large"
								onChange={() => {
									setIsNumbers(!isNumbers);
								}}
								checked={isNumbers}
							/>
						}
						label={
							<Typography className="checkbox" variant="button">
								Numbers
							</Typography>
						}
						sx={{ mb: 3 }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								size="large"
								onChange={() => {
									setIsSpecial(!isSpecial);
								}}
								checked={isSpecial}
							/>
						}
						label={
							<Typography className="checkbox" variant="button">
								Special Characters
							</Typography>
						}
						sx={{ mb: 3 }}
					/>
				</FormGroup>
					<Box className="bottom-section">
						<Container>
							<Button
								className="gobutton"
								variant="contained"
								color="primary"
								size="large"
								onClick={handleClickOpen}
							>
								Generate
							</Button>
						</Container>
						{popupSwitcher()}
					</Box>
			</Container>
		</ThemeProvider>
	);
}
