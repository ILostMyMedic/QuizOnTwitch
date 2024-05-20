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
}

export interface IQuizRequest extends IQuiz {
    questions: IQuestions[];
}

export interface IQuizResponse extends IQuiz {
    questions: string[];
}
