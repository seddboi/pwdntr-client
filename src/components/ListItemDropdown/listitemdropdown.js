import React from 'react';
import { Container, Box, Typography, List, ListItem, Collapse, Divider, IconButton } from '@mui/material';
import { Clear, Build, Visibility } from '@mui/icons-material';

export function Dropdown({ item, index, open, showPassword, handleVisibility, handleDialogOpen }) {
	return (
		<Collapse in={open} timeout="auto" unmountOnExit>
			<List component="div">
				<ListItem sx={{ paddingBottom: '10px' }}>
					<Container sx={{ display: 'flex', flexDirection: 'row' }}>
						<Container sx={{ display: 'flex', flexDirection: 'column', width: '90%', flexGrow: '2' }}>
							<Container sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
								<Container sx={{ maxWidth: '450px', display: 'flex', flexDirection: 'column' }}>
									<Typography variant="subtitle1" sx={{ color: 'lightgrey', textAlign: 'center' }}>
										Username
									</Typography>
									<Container sx={{ display: 'flex', height: '100%', width: 'auto', alignItems: 'center' }}>
										<Typography variant="h6" sx={{ alignSelf: 'center', textAlign: 'center', color: '#1C5BB0' }}>
											{item.username}
										</Typography>
									</Container>
								</Container>
								<Divider orientation="vertical" flexItem />
								<Container sx={{ maxWidth: '500px', textAlign: 'center' }}>
									<Typography variant="subtitle1" sx={{ color: 'lightgrey', textAlign: 'center' }}>
										Date Created
									</Typography>
									<Container>
										<Typography variant="h6" sx={{ textAlign: 'center', color: '#1C5BB0' }}>
											{item.timeCreated}
										</Typography>
									</Container>
								</Container>
							</Container>
							<Divider flexItem sx={{ mt: 2, mb: 2 }} />
							<Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
								<Box>
									<Typography variant="subtitle1" sx={{ color: 'lightgrey', textAlign: 'center' }}>
										Password
									</Typography>
									<Typography variant="h6" sx={{ textAlign: 'center', color: '#1C5BB0', overflowWrap: 'break-word' }}>
										{showPassword ? item.password : '••••••••••'}
									</Typography>
								</Box>
								<IconButton onClick={handleVisibility}>
									{showPassword ? <Visibility sx={{ display: 'none' }} /> : <Visibility />}
								</IconButton>
							</Container>
						</Container>
						<Container
							passwordid={index}
							sx={{ width: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
						>
							<IconButton
								id="edit"
								color="primary"
								onClick={(e) => handleDialogOpen(e)}
								sx={{ mt: 1, mb: 1, height: '50px', width: '50px', backgroundColor: '#F7F9F9' }}
							>
								<Build sx={{ width: '100%', height: 'auto' }} />
							</IconButton>
							<IconButton
								id="delete"
								color="primary"
								onClick={(e) => handleDialogOpen(e)}
								sx={{ mt: 1, mb: 1, height: '50px', width: '50px', backgroundColor: '#F7F9F9' }}
								passwordid={item.passwordID}
							>
								<Clear sx={{ width: '100%', height: 'auto' }} />
							</IconButton>
						</Container>
					</Container>
				</ListItem>
			</List>
		</Collapse>
	);
}
