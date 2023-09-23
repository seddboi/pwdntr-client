import React from 'react';
import { List, Box, Typography } from '@mui/material';
import { PasswordItem } from '../ListItem/listitem';
import { SearchBar } from '../SearchBar/searchbar';

export function PasswordEntriesDiv({
	entries,
	selectedID,
	setSelectedID,
	searchText,
	setSearchText,
	selectedButton,
	setSelectedButton,
	handleUpdate,
	handleDelete,
}) {
	return (
		<Box sx={{ width: '100%', maxWidth: '750px' }}>
			<Typography variant="h5" sx={{ mt: 3, mb: 3, color: '#ffffff' }}>
				Use the search bar below to filter!
			</Typography>
			<Box>
				<List
					id="listed-passwords"
					sx={{
						width: '100%',
						maxWidth: '750px',
						maxHeight: '65vh',
						overflow: 'scroll',
						bgcolor: 'white',
						border: '2px solid #17202A',
						borderRadius: '15px',
					}}
				>
					<SearchBar setSearchText={setSearchText} />
					{entries
						.filter((item) => item.website.toLowerCase().includes(searchText.toLowerCase()))
						.map((entry) => (
							<PasswordItem
								item={entry}
								index={entry.passwordID}
								selectedPassId={selectedID}
								setSelectedPassID={setSelectedID}
								selectedButton={selectedButton}
								setSelectedButton={setSelectedButton}
								handleUpdate={handleUpdate}
								handleDelete={handleDelete}
								key={entry.passwordID}
							/>
						))}
				</List>
			</Box>
		</Box>
	);
}
