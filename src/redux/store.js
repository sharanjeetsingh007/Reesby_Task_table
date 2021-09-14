import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './sliceLogin';
import searchReducer from './sliceSearch';

const reducer = combineReducers({
    user: userReducer,
    search: searchReducer
})

export const store = configureStore({
    reducer,
})