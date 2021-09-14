import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'searchValue',
    initialState: {
        searchValue: "",
    },


    reducers: {
        searched: (state, action) => {
            state.searchValue = action.payload;
        },

        clear: (state) => {
            state.searchValue = null;
        }
    }
})

export const { searched, clear } = searchSlice.actions;
export const selectSearched = (state) => state.search.searchValue;
export default searchSlice.reducer;
