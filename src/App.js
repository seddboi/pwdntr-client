import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/home';
import { SavedPasswords } from './pages/Saved Passwords/savedpasswords';
import { Generator } from './pages/Generator/generator';
import { Login } from './pages/Login/login';
import { Signup } from './pages/Signup/signup';
import { Error404 } from './pages/Error404/error404';
import { PrivateRoutes } from './utils/privateroutes';

import { darkTheme } from './utils/customTheme';
import { ThemeProvider } from '@mui/material/styles';

export const APP_URL = 'https://pwdntr-server-production.up.railway.app';

function App() {
	return (
		<Router>
			<ThemeProvider theme={darkTheme}>
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
			</ThemeProvider>
		</Router>
	);
}

export default App;
