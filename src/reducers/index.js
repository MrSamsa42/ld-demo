import { combineReducers } from "redux";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";

export default combineReducers({
    auth: authReducer,
    account: accountReducer
})
