import { createSlice } from '@reduxjs/toolkit';
import { IStringBundle } from '../../interfaces/strings';

enum Language {
    ENGLISH = 'en-US',
    FRENCH = 'fr-FR',
    NORWEGIAN = 'nb-NO',
    GERMAN = 'de-DE',
    SPANISH = 'es-ES',
    ITALIAN = 'it-IT',
}

interface LanguageState {
    language: Language;
    strings: IStringBundle | {};
}

const initialState: LanguageState = {
    language:
        localStorage.getItem('language') != undefined
            ? (localStorage.getItem('language') as Language)
            : Language.ENGLISH,
    strings: {},
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            localStorage.setItem('language', state.language);
        },
        getStrings: (state, action) => {
            state.strings = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addDefaultCase((state) => state);
    },
});

export const { setLanguage, getStrings } = languageSlice.actions;
export default languageSlice.reducer;
