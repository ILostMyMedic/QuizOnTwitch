import { useState } from 'react';
import { HeartIcon as HeartSolid } from '@heroicons/react/20/solid';
import { HeartIcon as HeatOutline } from '@heroicons/react/24/outline';
import { Button } from '../../../components/button';
import { Text } from '../../../components/text';
import { IQuiz } from '../../../interfaces/quiz';

const Preview = ({ quizzes }: { quizzes: IQuiz[] }) => {
    const [localQuizzes, setLocalQuizzes] = useState<IQuiz[]>(quizzes);

    const convertLikes = (likes: number) => {
        if (likes < 1000) {
            return likes;
        }
        if (likes < 1000000) {
            return `${(likes / 1000).toFixed(1)}k`;
        }
        return `${(likes / 1000000).toFixed(1)}m`;
    };


    if(!localQuizzes || localQuizzes.length <= 0) return (
        <div className="flex flex-col items-center justify-center h-full">
            <Text className="text-3xl font-semibold text-gray-900">No quizzes found</Text>
        </div>
    );

    return (
        <div className="">
            <div className="mx-auto max-w-8xl px-4 pb-4 sm:pb-10 lg:pb-8 sm:px-6 lg:max-w-8xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                    {localQuizzes.map((quiz) => (
                        <div key={quiz.id} className="group relative flex flex-col overflow-hidden">
                            <div className="aspect-h-4 aspect-w-3 sm:aspect-none group-hover:opacity-75 sm:h-56">
                                <img
                                    src={``}
                                    alt={quiz.id}
                                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                />
                            </div>
                            <div className="flex flex-1 flex-col space-y-2 p-4">
                                <Text className="text-base sm:text-base font-medium text-gray-900">
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 pointer-events-none"
                                    />
                                    {quiz.title}
                                </Text>
                                <Text className="text-sm sm:text-sm">{quiz.description}</Text>
                                <div className="flex flex-1 flew-row items-center w-full">
                                    <button
                                        className="flex flex-row justify-start items-center gap-2 h-full"
                                        onClick={() => {
                                            // find and replace the liked status
                                            const newQuiz = localQuizzes.map((p) => {
                                                if (p.id === quiz.id) {
                                                    return {
                                                        ...p,
                                                        ratings: quiz.ratings ? quiz.ratings - 1 : 1,
                                                    };
                                                }
                                                return p;
                                            });

                                            // update the state
                                            setLocalQuizzes(newQuiz);
                                        }}
                                    >
                                        {quiz.ratings ? (
                                            <HeartSolid className="text-red-500 w-6" />
                                        ) : (
                                            <HeatOutline className="text-gray-500 w-6" />
                                        )}
                                        <p className="text-sm italic text-gray-500">
                                            {convertLikes(quiz.ratings || 0)} likes
                                        </p>
                                    </button>
                                    <div className="flex flex-1 justify-end">
                                        <Button className="rounded-md bg-gray-900 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                            Play
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Preview;
