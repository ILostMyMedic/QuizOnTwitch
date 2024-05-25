import React from 'react';
import { 
    MicrophoneIcon,
    GlobeEuropeAfricaIcon,
    BeakerIcon,
    AcademicCapIcon,
    EllipsisVerticalIcon
} from '@heroicons/react/20/solid';
import { HeartIcon as HeatOutline } from '@heroicons/react/24/outline';
import { Button } from '../../../components/button';
import { Text } from '../../../components/text';
import { IQuiz } from '../../../interfaces/quiz';
import Wave from './wave';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import {
    Dropdown,
    DropdownButton,
    DropdownMenu,
    DropdownItem,
    DropdownSeparator,
    DropdownLabel,
} from '../../../components/dropdown';

const Preview = (
    { quizzes }: { quizzes: IQuiz[] }
) => {

    const convertLikes = (likes: number) => {
        if (likes < 1000) {
            return likes;
        }
        if (likes < 1000000) {
            return `${(likes / 1000).toFixed(1)}k`;
        }
        return `${(likes / 1000000).toFixed(1)}m`;
    };



    const deleteQuiz = (id: string) => {
        console.log('delete quiz', id);
    };

    const editQuiz = (id: string) => {
        console.log('edit quiz', id);
    };

    return (
        <>
            <div className="max-w-8xl pb-4 sm:pb-10 lg:pb-8 lg:max-w-8xl">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                    {quizzes.map((quiz) => (
                        <div
                            key={uuid()}
                            className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-white/10 bg-container-light dark:bg-container-dark"
                        >
                            <div className="absolute top-0 left-0 w-full z-10">
                                <Wave
                                    bottom={{
                                        start: quiz.gradients?.bottom.start ?? 'rgba(62, 243, 230, 1)',
                                        end: quiz.gradients?.bottom.end ?? 'rgba(11, 139, 255, 1)',
                                    }}
                                    top={{
                                        start: quiz.gradients?.top.start ?? 'rgba(255, 223, 186, 1)',
                                        end: quiz.gradients?.top.end ?? 'rgba(255, 107, 107, 1)',
                                    }}
                                />
                            </div>
                            <div className="flex flex-1 flex-col space-y-2 p-4 z-20">
                                {/* administrate your own quizzes */}
                                <div className="flex flex-row absolute top-2 right-2 gap-2">
                                    <Dropdown>
                                        <DropdownButton outline>
                                            <span className="sr-only">Quiz options</span>
                                            <EllipsisVerticalIcon className="w-8 text-container-dark" />
                                        </DropdownButton>
                                        <DropdownMenu anchor="bottom end" className="z-50 bg-white">
                                            <DropdownItem
                                                key={uuid()}
                                                onClick={() => console.log('Edit quiz')}
                                            >
                                                <DropdownLabel className="flex flex-row group">
                                                    Edit
                                                </DropdownLabel>
                                            </DropdownItem>
                                            
                                            <DropdownSeparator />

                                            <DropdownItem
                                                key={uuid()}
                                                onClick={() => console.log('Delete quiz')}
                                            >
                                                <DropdownLabel className="flex flex-row group">
                                                    Delete
                                                </DropdownLabel>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>

                                <div className={clsx(
                                    'rounded-lg bg-purple-500 w-fit p-2 shadow-md shadow-black/10 mb-4'
                                )}>
                                    <GlobeEuropeAfricaIcon className="object-cover w-10 h-10" />
                                    
                                </div>
                                <Text className="text-base sm:text-base font-medium text-gray-900">
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 pointer-events-none"
                                    />
                                    {quiz.title}
                                </Text>
                                <Text className="text-sm sm:text-sm">{quiz.description}</Text>
                                <div className="flex flex-1 flew-row items-center w-full">
                                    <HeatOutline className="text-gray-500 w-6" />
                                    <p className="text-sm italic text-gray-500">
                                        {convertLikes(quiz.ratings || 0)} likes
                                    </p>
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
        </>
    );
};

export default Preview;
