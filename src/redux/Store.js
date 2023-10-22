import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({universities: Reducer})

const Store = configureStore({reducer: rootReducer, middleware:[thunk, logger]})

export default Store;