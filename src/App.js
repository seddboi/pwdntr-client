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
			main: '#212F3D',
			light: '#566573',
			dark: '#17202A',
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
