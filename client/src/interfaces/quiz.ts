export enum QuizStatus {
    Waiting = 'waiting',
    Started = 'started',
    Ended = 'ended',
}
export enum PlayerStatus {
    Waiting = 'joined',
    Playing = 'playing',
    Ended = 'guessed',
}

export interface IQuestion {
    question: string;
    answer: string;
    options: string[];
}

export interface IQuiz {
    host: string;
    code: string;
    questions: IQuestion[];
    score: number;
    currentQuestionIndex: number;
    getQuestion: () => IQuestion;
    guess: (answer: string) => void;
    nextQuestion: () => void;
    hasEnded: () => boolean;
    reset: () => void;
    players: IPlayer[];
}

export interface IPlayer {
    id: string;
    username: string;
    avatar: string;
    score: number;
    currentQuestionIndex: number;
    getQuestion: () => IQuestion;
    guess: (answer: string) => void;
    nextQuestion: () => void;
    hasEnded: () => boolean;
    reset: () => void;
}
