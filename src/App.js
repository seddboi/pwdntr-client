import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/home';
import { SavedPasswords } from './pages/Saved Passwords/savedpasswords';
import { Generator } from './pages/Generator/generator';
import { Login } from './pages/Login/login';
import { Signup } from './pages/Signup/signup';
import { Error404 } from './pages/Error404/error404';

import { PrivateRoutes } from './utils/privateroutes';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#5A5A5A',
			light: '#8b8b8b',
			dark: '#3e3e3e',
			contrastText: '#eeeeee',
		},
		secondary: {
			main: '#808080',
			light: '#a6a6a6',
			dark: '#595959',
			contrastText: '#181818',
		},
		error: {
			main: '#cc0000',
			light: '#d63232',
			dark: '#a30000',
			contrastText: '#ffffff',
		},
		info: {
			main: '#F8F8FF',
			light: '#f9f9ff',
			dark: '#c6c6cc',
			contrastText: '#181819',
		},
		button: {
			main: '#D3D3D3',
			light: '#e0e0e0',
			dark: '#939393',
			contrastText: '#151515',
		},
	},
	typography: {
		button: {
			textTransform: 'none',
		},
	},
});

export const APP_URL = 'https://pwdntr-server-production.up.railway.app';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/saved" element={<SavedPasswords />} />
					</Route>
					<Route exact path="/login" element={<Login />}></Route>
					<Route exact path="/signup" element={<Signup />}></Route>
					<Route exact path="/" element={<Generator />}></Route>
					<Route path="*" element={<Error404 />}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
