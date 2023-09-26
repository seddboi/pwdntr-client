import React from 'react';
import { Container, Box, Typography, Collapse, Divider, IconButton } from '@mui/material';
import { Clear, Build, Visibility } from '@mui/icons-material';
import './listitemdropdown.css';

export function Dropdown({ item, index, open, showPassword, handleVisibility, handleDialogOpen }) {
	return (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: { xs: 3 } }}>
				<Container
					className="userdate&pass"
					sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mt: 2, mb: { xs: 1, sm: 2 } }}
				>
					<Container className="user&date" sx={{ display: 'flex', justifyContent: 'center' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', whiteSpace: 'normal', width: '100%' }}>
							<Typography variant="subtitle1" sx={{ color: 'lightgrey', textAlign: 'center' }}>
								Username
							</Typography>
							<Container sx={{ display: 'flex', height: '100%', width: 'auto', alignItems: 'center' }}>
								<Typography variant="h6" sx={{ alignSelf: 'center', textAlign: 'center', color: '#2799ff' }}>
									{item.username}
								</Typography>
							</Container>
						</Box>

						<Divider orientation="vertical" color="white" flexItem />

						<Box sx={{ textAlign: 'center', width: '100%' }}>
							<Typography variant="subtitle1" sx={{ color: 'lightgrey', textAlign: 'center' }}>
								Date Created
							</Typography>
							<Container>
								<Typography variant="h6" sx={{ textAlign: 'center', color: '#2799ff' }}>
									{item.timeCreated}
								</Typography>
							</Container>
						</Box>
					</Container>

					<Divider color="white" flexItem sx={{ mt: 2, mb: 2 }} />

					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
						<Box>
							<Typography variant="subtitle1" sx={{ color: 'lightgrey', textAlign: 'center' }}>
								Password
							</Typography>
							<Typography variant="h6" sx={{ textAlign: 'center', color: '#2799ff', overflowWrap: 'break-word' }}>
								{showPassword ? item.password : '••••••••••'}
							</Typography>
						</Box>
						<IconButton className={showPassword ? 'hide-pass-vis-button' : 'show-pass-vis-button'} onClick={handleVisibility}>
							<Visibility />
						</IconButton>
					</Box>
				</Container>

				<Box
					passwordid={index}
					sx={{
						display: 'flex',
						flexDirection: { xs: 'row', sm: 'column' },
						alignItems: 'center',
						justifyContent: { xs: 'space-around', sm: 'center' },
					}}
				>
					<IconButton
						id="edit"
						onClick={(e) => handleDialogOpen(e)}
						sx={{
							mt: 1,
							mb: 1,
							height: '50px',
							width: '50px',
							backgroundColor: '#F7F9F9',
							'&:hover': {
								bgcolor: '#c6c6cc',
							},
						}}
					>
						<Build sx={{ width: '100%', height: 'auto' }} />
					</IconButton>
					<IconButton
						id="delete"
						onClick={(e) => handleDialogOpen(e)}
						sx={{
							mt: 1,
							mb: 1,
							height: '50px',
							width: '50px',
							backgroundColor: '#F7F9F9',
							'&:hover': {
								bgcolor: '#c6c6cc',
							},
						}}
						passwordid={item.passwordID}
					>
						<Clear sx={{ width: '100%', height: 'auto' }} />
					</IconButton>
				</Box>
			</Container>
		</Collapse>
	);
}
