import React from 'react';
import { List, Box } from '@mui/material';
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
		<Box className="passwordEntries-container" sx={{ width: '100%' }}>
			<Box className="searchBar-container" sx={{ mb: 3, px: 2 }}>
				<SearchBar setSearchText={setSearchText} />
			</Box>
			<Box
				className="passwordEntriesList-container-outer"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					py: 1,
					width: '100%',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						width: '100%',
						maxWidth: { sm: '1000px' },
						backgroundColor: '#3e3e3e',
						borderRadius: '5px',
						py: 1,
					}}
				>
					<List
						id="listed-passwords"
						sx={{
							maxHeight: { xs: '65vh', sm: '55vh' },
							minHeight: { sm: '400px' },
							width: '100%',
							maxWidth: { sm: '900px' },
							overflowY: 'scroll',
							'&::-webkit-scrollbar-track': {
								backgroundColor: '#3e3e3e',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: '#161616',
							},
						}}
					>
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
		</Box>
	);
}
