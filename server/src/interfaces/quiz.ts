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
    questions: IQuestions[];
    private: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    ownerId: string;
}
