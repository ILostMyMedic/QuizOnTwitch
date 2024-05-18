import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import themeReducer from './reducers/themeReducer';
import languageReducer from './reducers/languageReducer';
import quizReducer from './reducers/quizReducer';

export interface RootState {
    theme: ReturnType<typeof themeReducer>;
    language: ReturnType<typeof languageReducer>;
    quiz: ReturnType<typeof quizReducer>;
}

const store = configureStore({
    reducer: {
        theme: themeReducer,
        language: languageReducer,
        quiz: quizReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
