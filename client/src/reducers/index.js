import {combineReducers} from "redux";
import posts from "./posts";
import user from "./user";
import modal from "./modal";

const rootReducer = combineReducers({
    posts,
    user,
    modal
})

export default rootReducer