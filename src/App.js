import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
import Home from "./pages/Home";
import AuthRoute from "./utils/authRoute";
import Profile from "./pages/Profile";
import ProfileRoute from "./utils/profileProtected";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login/*' element={<AuthRoute component={Login} />} />
					<Route
						path='/register/*'
						element={<AuthRoute component={Register} />}
					/>
					<Route
						path='/profile'
						element={<ProfileRoute component={Profile} />}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
