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
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { Popup } from '../Popup/popup';
import { usePasswordRandomizer } from '../../hooks/usePasswordRandomizer';
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
	const currentDate = dayjs().format('MM/DD/YYYY');

	const addPassword = async () => {
		await Axios.post(
			APP_URL + '/add',
			{
				userID: sessionStorage.getItem('_uid'),
				username: entryUsername,
				password: password,
				timeCreated: currentDate,
				website: entryWebsite,
			},
			{
				headers: {
					Authorization: 'Bearer ' + sessionStorage.getItem('_at'),
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
			<DialogTitle>Please enter a value between 8-20 and select at least one option.</DialogTitle>
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
		if (
			characterEntry < 8 ||
			characterEntry > 20 ||
			characterEntry === '' ||
			(!isUppercase && !isLowercase && !isNumbers && !isSpecial)
		) {
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
					inputProps={{ min: 8, max: 20 }}
					value={characterEntry}
					onChange={(e) => {
						setCharacterEntry(e.target.value);
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

				<FormControlLabel
					control={
						<Checkbox
							color="button"
							size="large"
							disableRipple
							icon={<CheckBoxOutlineBlank sx={{ color: 'button.contrastText' }} />}
							onChange={() => {
								setIsUppercase(!isUppercase);
							}}
							checked={isUppercase}
						/>
					}
					label={
						<Typography
							className="prevent-select"
							variant="body1"
							sx={{ color: isUppercase ? 'button.main' : 'button.contrastText', fontSize: '20px' }}
						>
							Uppercase Letters
						</Typography>
					}
					sx={{
						mb: 3,
						mx: 0,
						borderRadius: '8px',
						bgcolor: 'item',
						boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
					}}
				/>

				<FormControlLabel
					control={
						<Checkbox
							color="button"
							size="large"
							disableRipple
							icon={<CheckBoxOutlineBlank sx={{ color: 'button.contrastText' }} />}
							onChange={() => {
								setIsLowercase(!isLowercase);
							}}
							checked={isLowercase}
						/>
					}
					label={
						<Typography
							className="prevent-select"
							variant="body1"
							sx={{ color: isLowercase ? 'button.main' : 'button.contrastText', fontSize: '20px' }}
						>
							Lowercase Letters
						</Typography>
					}
					sx={{
						mb: 3,
						mx: 0,
						borderRadius: '8px',
						bgcolor: 'item',
						boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
					}}
				/>

				<FormControlLabel
					control={
						<Checkbox
							color="button"
							size="large"
							disableRipple
							icon={<CheckBoxOutlineBlank sx={{ color: 'button.contrastText' }} />}
							onChange={() => {
								setIsNumbers(!isNumbers);
							}}
							checked={isNumbers}
						/>
					}
					label={
						<Typography
							className="prevent-select"
							variant="body1"
							sx={{ color: isNumbers ? 'button.main' : 'button.contrastText', fontSize: '20px' }}
						>
							Numbers
						</Typography>
					}
					sx={{
						mb: 3,
						mx: 0,
						borderRadius: '8px',
						bgcolor: 'item',
						boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
					}}
				/>

				<FormControlLabel
					control={
						<Checkbox
							color="button"
							size="large"
							disableRipple
							icon={<CheckBoxOutlineBlank sx={{ color: 'button.contrastText' }} />}
							onChange={() => {
								setIsSpecial(!isSpecial);
							}}
							checked={isSpecial}
						/>
					}
					label={
						<Typography
							className="prevent-select"
							variant="body1"
							sx={{ color: isSpecial ? 'button.main' : 'button.contrastText', fontSize: '20px' }}
						>
							Special Characters
						</Typography>
					}
					sx={{
						mb: 3,
						mx: 0,
						borderRadius: '8px',
						bgcolor: 'item',
						boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.14)',
					}}
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
