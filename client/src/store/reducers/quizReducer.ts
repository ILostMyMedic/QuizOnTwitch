import { createSlice } from '@reduxjs/toolkit';

interface Options {
    id: number;
    answer: string;
    correct: boolean;
}
interface Questions {
    id: number;
    question: string;
    options?: Options[];
}

interface QuizState {
    title?: string;
    description?: string;
    questions?: Questions[];
    private: boolean;
    open: boolean;
}

const initialState: QuizState = {
    title: '',
    description: '',
    questions: [],
    private: true,
    open: false,
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuiz: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.questions = action.payload.questions;
            state.private = action.payload.private;
        },
        getState: (state): QuizState => state,
        toggleMenu: (state) => {
            state.open = !state.open;
        },
        addQuestion: (state, action) => {
            state.questions?.push(action.payload);
        },
        removeQuestion: (state, action) => {
            state.questions = state.questions?.filter((question) => question.id !== action.payload);
        },
        editQuestion: (state, action) => {
            const question = state.questions?.find((question) => question.id === action.payload.id);
            question!.question = action.payload.question;
        },
        addOption: (state, action) => {
            const question = state.questions?.find(
                (question) => question.id === action.payload.questionId
            );
            question?.options?.push(action.payload.option);
        },
        removeOption: (state, action) => {
            const question = state.questions?.find(
                (question) => question.id === action.payload.questionId
            );
            question!.options = question!.options?.filter(
                (option) => option.id !== action.payload.optionId
            );
        },
        editOption: (state, action) => {
            const question = state.questions?.find(
                (question) => question.id === action.payload.questionId
            );
            const option = question?.options?.find(
                (option) => option.id === action.payload.optionId
            );
            option!.answer = action.payload.option.answer;
            option!.correct = action.payload.option.correct;
        },
    },
});

export const {
    setQuiz,
    getState,
    toggleMenu,
    addQuestion,
    removeQuestion,
    editQuestion,
    addOption,
    removeOption,
    editOption,
} = quizSlice.actions;
export default quizSlice.reducer;
