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
    icon?: string;
    gradients?: {
        bottom: {
            start: string;
            end: string;
        };
        top: {
            start: string;
            end: string;
        };
    }
    createdAt?: Date;
    updatedAt?: Date;
    ownerId: string;
}

export interface IQuizSearch {
    ownerId?: string;
    private?: boolean;
    title?: string;
    description?: string;
    deleted?: boolean;
    ratings?: number;
}

export interface IQuizDiscover {
    query?: object;
    ownerId?: string;
    limit?: number;
    sort?: 'newest' | 'popular' | 'lastPlayed';
}

export interface IQuizRequest extends IQuiz {
    questions: IQuestions[];
}

export interface IQuizResponse extends IQuiz {
    questions: string[];
}
