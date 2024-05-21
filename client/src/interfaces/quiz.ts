export interface IQuestion {
    question: string;
    answer: string;
    options: string[];
}

export interface IOptions {
    id: string;
    option: string;
    isCorrect: boolean;
}

export interface IQuestions {
    id: string;
    question: string;
    options: IOptions[];
}
export interface IQuiz {
    id: string;
    title: string;
    description: string;
    private: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    ownerId: string;
    ratings?: number;
}

export interface IQuizSearch {
    ownerId?: string;
    private?: boolean;
    title?: string;
    description?: string;
    deleted?: boolean;
    ratings?: number;
}

export interface IQuizRequest extends IQuiz {
    questions: IQuestions[];
}

export interface IQuizResponse extends IQuiz {
    questions: string[];
}
