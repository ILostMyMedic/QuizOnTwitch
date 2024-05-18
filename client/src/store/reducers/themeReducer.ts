import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
    isDarkMode: boolean;
}

const initialState: ThemeState = {
    isDarkMode:
        localStorage.getItem('isDarkMode') != undefined
            ? JSON.parse(localStorage.getItem('isDarkMode') as string)
            : false, //light mode is the default// Set default to 'light' if not found in localStorage
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', state.isDarkMode ? 'true' : 'false');
        },
    },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
