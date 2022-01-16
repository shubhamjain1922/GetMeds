import { combineReducers } from "redux";

import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
	shop: cartReducer,
});

export default rootReducer;
