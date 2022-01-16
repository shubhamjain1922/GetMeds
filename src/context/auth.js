import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
	user: null,
};

if (localStorage.getItem("access_token")) {
	const decodeToken = jwtDecode(localStorage.getItem("access_token"));
	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem("access_token");
		localStorage.removeItem("user_details");
	} else {
		initialState.user = decodeToken;
	}
}

const AuthContext = createContext({
	user: null,
	login: (data) => {},
	logout: () => {},
});

function authReducer(state, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
}

function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const login = (data) => {
		localStorage.setItem("user_details", JSON.stringify(data));
		localStorage.setItem("access_token", data.access_token);
		dispatch({
			type: "LOGIN",
			payload: data,
		});
	};
	const logout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("user_details");
		dispatch({
			type: "LOGOUT",
		});
	};

	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
}

export { AuthContext, AuthProvider };
