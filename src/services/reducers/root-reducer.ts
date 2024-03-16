import { combineReducers } from "redux";
import { itemsReducer } from "./items-reducer";

export const rootReducer = combineReducers({
    items: itemsReducer,
})