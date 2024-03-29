import React from 'react';
import { List, Box } from '@mui/material';
import { PasswordItem } from '../ListItem/listitem';
import { SearchBar } from '../SearchBar/searchbar';

import '../../pages/Saved Passwords/savedpasswords.css';

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
						maxWidth: { sm: '900px' },
						backgroundColor: 'container.main',
						borderRadius: '5px',
						py: 1,
						mx: 2,
					}}
				>
					<List
						className="listed-passwords"
						sx={{
							maxHeight: { xs: '65vh', sm: '55vh' },
							minHeight: { sm: '400px' },
							width: '100%',
							mr: 2,
							overflowY: 'scroll',
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
