import React, { createContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuiz, toggleMenu } from '../store/reducers/quizReducer';
import { RootState } from '../store';

import { Fragment  } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { LinkIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Text, Strong } from '../components/text';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import {
    RadioGroup,
    RadioField,
    Radio,
} from '../components/radio';
import { Description, Fieldset, Label, Legend } from '../components/fieldset';
import { Button } from '../components/button';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/paths';
import { useStrings } from '../hooks/useStrings';

const team = [
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        href: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

interface QuizContextProps {
    title?: string;
    description?: string;
    questions?: string[];
    private: boolean;
    toggleMenu?: () => void;
}

const QuizContext = createContext<QuizContextProps>({
    title: '',
    description: '',
    questions: [],
    private: true,
    toggleMenu: () => {},
});


const QuizProvider: React.FC<{ children: React.ReactNode }> = (
    { children },
) => {
    const strings = useStrings();
    const [error, setError] = useState<string[]>([]);
    const navigate = useNavigate();
    const title = useSelector((state: RootState) => state.quiz.title);
    const description = useSelector((state: RootState) => state.quiz.description);
    const questions = useSelector((state: RootState) => state.quiz.questions);
    const privateQuiz = useSelector((state: RootState) => state.quiz.private);
    const open = useSelector((state: RootState) => state.quiz.open);
    const dispatch = useDispatch();

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const privateRef = useRef<HTMLInputElement>(null);
    


    const save = async () => {
        setError([]);
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;
        const privateQuiz = privateRef.current?.value === 'private';

        if (!title) setError((prev) => [...prev, strings.quizSlideoverErrorTitle]);
        if(!description) setError((prev) => [...prev, strings.quizSlideoverErrorDescription]);
        if(!title || !description) return;
        
        dispatch(setQuiz({ title, description, questions, private: privateQuiz }));

        setOpen();
        navigate(routes.quiz.create);
    }
    
    const setOpen = () => {
        dispatch(toggleMenu());
    };

    useEffect(() => {
        dispatch(setQuiz({ title, description, questions, private: privateQuiz }));
    }, [title, description, questions, privateQuiz, dispatch]);

    return (
        <QuizContext.Provider
            value={{
                title,
                description,
                questions,
                private: privateQuiz,
                toggleMenu: setOpen,
            }}
        >
            <Transition.Root show={open} as={Fragment}>
                <Dialog className="relative z-50" onClose={setOpen}>
                    <div className="fixed inset-0" />

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-200 sm:duration-400"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-200 sm:duration-400"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <form className="flex h-full flex-col divide-y divide-gray-200 dark:divide-white/10 bg-container-light dark:bg-container-dark shadow-xl">
                                            <div className="h-0 flex-1 overflow-y-auto">
                                                <div className="bg-primary px-4 py-6 sm:px-6">
                                                    <div className="flex items-center justify-between">
                                                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                            {strings.quizSlideoverTitle}
                                                        </Dialog.Title>
                                                        <div className="ml-3 flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                className="relative rounded-md bg-primary text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                                onClick={() => setOpen()}
                                                            >
                                                                <span className="absolute -inset-2.5" />
                                                                <span className="sr-only">
                                                                    {
                                                                        strings.quizSlideoverClosePanelSR
                                                                    }
                                                                </span>
                                                                <XMarkIcon
                                                                    className="h-6 w-6"
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-1 text-indigo-300">
                                                        <Text>
                                                            {strings.quizSlideoverDescription}
                                                        </Text>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 flex-col justify-between">
                                                    <div className="divide-y divide-gray-200 dark:divide-white/10 px-4 sm:px-6">
                                                        {error.length > 0 && (
                                                            <div className="my-4 text-custom-red">
                                                                {error.map((error) => (
                                                                    <Text key={error}>
                                                                        * {error}
                                                                    </Text>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <div className="space-y-6 pb-5 pt-6">
                                                            <div>
                                                                <label
                                                                    htmlFor="project-name"
                                                                    className="block text-sm font-medium leading-6"
                                                                >
                                                                    <Strong>
                                                                        {
                                                                            strings.quizSlideoverTitleLabel
                                                                        }
                                                                    </Strong>
                                                                </label>
                                                                <div className="mt-2">
                                                                    <Input
                                                                        type="text"
                                                                        name="project-name"
                                                                        id="project-name"
                                                                        placeholder={
                                                                            strings.quizSlideoverTitlePlaceholder
                                                                        }
                                                                        ref={titleRef}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor="description"
                                                                    className="block text-sm font-medium leading-6"
                                                                >
                                                                    <Strong>
                                                                        {
                                                                            strings.quizSlideoverDescriptionLabel
                                                                        }
                                                                    </Strong>
                                                                </label>
                                                                <div className="mt-2">
                                                                    <Textarea
                                                                        id="description"
                                                                        name="description"
                                                                        rows={4}
                                                                        placeholder={
                                                                            strings.quizSlideoverDescriptionPlaceholder
                                                                        }
                                                                        ref={descriptionRef}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Strong>Manage contributors</Strong>
                                                                <div className="mt-2">
                                                                    <div className="flex space-x-2">
                                                                        {team.map((person) => (
                                                                            <a
                                                                                key={person.email}
                                                                                href={person.href}
                                                                                className="relative rounded-full hover:opacity-75"
                                                                            >
                                                                                <img
                                                                                    className="inline-block h-8 w-8 rounded-full"
                                                                                    src={
                                                                                        person.imageUrl
                                                                                    }
                                                                                    alt={
                                                                                        person.name
                                                                                    }
                                                                                />
                                                                            </a>
                                                                        ))}
                                                                        <button
                                                                            type="button"
                                                                            className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                                                        >
                                                                            <span className="absolute -inset-2" />
                                                                            <span className="sr-only">
                                                                                {
                                                                                    strings.quizSlideoverAddContributorsSR
                                                                                }
                                                                            </span>
                                                                            <PlusIcon
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Fieldset>
                                                                <Legend>
                                                                    {
                                                                        strings.quizSlideoverPrivateFieldLabel
                                                                    }
                                                                </Legend>
                                                                <Text>
                                                                    {
                                                                        strings.quizSlideoverPrivateFieldDescription
                                                                    }
                                                                </Text>
                                                                <RadioGroup
                                                                    name="resale"
                                                                    defaultValue={
                                                                        privateQuiz
                                                                            ? 'private'
                                                                            : 'public'
                                                                    }
                                                                >
                                                                    <RadioField>
                                                                        <Radio value="public" />
                                                                        <Label>
                                                                            {
                                                                                strings.quizSlideoverPublicOptionLabel
                                                                            }
                                                                        </Label>
                                                                        <Description>
                                                                            {
                                                                                strings.quizSlideoverPublicOptionDescription
                                                                            }
                                                                        </Description>
                                                                    </RadioField>
                                                                    <RadioField>
                                                                        <Radio value="private" />
                                                                        <Label>{strings.quizSlideoverPrivateOptionLabel}</Label>
                                                                        <Description>
                                                                            {strings.quizSlideoverPrivateOptionDescription}
                                                                        </Description>
                                                                    </RadioField>
                                                                </RadioGroup>
                                                            </Fieldset>
                                                        </div>
                                                        <div className="pb-6 pt-4">
                                                            <div className="flex text-sm">
                                                                <a
                                                                    href="#"
                                                                    className="group inline-flex items-center font-medium text-primary hover:text-indigo-500"
                                                                >
                                                                    <LinkIcon
                                                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span className="ml-2">
                                                                        {strings.quizSlideoverCopyLinkButton}
                                                                    </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                                <Button outline onClick={() => setOpen()}>
                                                    {strings.quizSlideoverCancelButton}
                                                </Button>

                                                <div className="mx-2"></div>

                                                <Button color="primary" onClick={() => save()}>
                                                    {strings.quizSlideoverNextButton}
                                                </Button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {children}
        </QuizContext.Provider>
    );
};



export { QuizContext, QuizProvider };