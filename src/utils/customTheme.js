import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
	palette: {
		background: '#898980',
		container: { main: '#A9B2AC', contrastText: '#262626' },
		item: { main: '#BCD0C7', dark: '#A9BBB3' },
		itemInsides: { main: '#C5DAC1', contrastText: '#262626' },
		button: {
			main: '#DEF2C8',
			light: '#EBF7DE',
			dark: '#C3E79C',
			contrastText: '#262626',
		},
	},
	typography: {
		button: {
			textTransform: 'none',
		},
	},
});
