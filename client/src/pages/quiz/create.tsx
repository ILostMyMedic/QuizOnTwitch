import { useEffect, useState, useRef } from 'react';
import Headline from '../../components/headline';
import Container from '../../layout/container';
import Process from './components/process';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import routes from '../../routes/paths';
import { 
    setQuiz, 
    addQuestion, 
    editQuestion,
    removeQuestion,
    addOption,
    removeOption,
    editOption
} from '../../store/reducers/quizReducer';
import { v4 as uuid } from 'uuid';
import { Button } from '../../components/button';
import clsx from 'clsx';
import { PlusIcon, CheckBadgeIcon } from '@heroicons/react/20/solid';
import { Input } from '../../components/input';

const CreateQuizPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [qId, setQId] = useState(uuid());
    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    useEffect(() => {
        if (quiz.title && quiz.description) {
            setStep(3);
        } else {
            dispatch(
                setQuiz({
                    title: 'Test',
                    description: 'Test',
                    questions: [],
                    collaborators: []
                })
            );
        }
    }, [quiz]);

    const QuestionInput = ({ questionId }: { questionId: string }) => {
        const [val, setVal] = useState('');

        const handleSave = () => {
            console.log({
                questionId,
                question: val,
            });
        };

        return (
            <div className="group flex w-full items-center justify-between space-x-3">
                <Input
                    placeholder="In what year did the Titanic sink?"
                    className="text-2xl sm:text-2xl"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onBlur={() => handleSave()}
                />
            </div>
        );
    };

    const AnswerInput = (
        { optionId, questionId }: { optionId: string; questionId: string }
    ) => {
        const [correct, setCorrect] = useState<boolean>(false);
        const [val, setVal] = useState('');

        const handleSave = (
            correct: boolean = false
        ) => {
            setCorrect(correct);

            console.log({
                questionId,
                optionId,
                option: {
                    answer: val,
                    correct,
                },
            });
        };

        return (
            <span className={clsx('answer-input flex flex-row gap-4')}>
                <Input
                    type="text"
                    className={clsx(
                        'text-lg sm:text-lg border-2 border-transparent',
                        correct ? 'border-custom-green rounded-lg text-custom-green' : ''
                    )}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onBlur={() => handleSave(correct)}
                    placeholder={''}
                />

                <span className="flex items-center justify-center">
                    <CheckBadgeIcon
                        className={clsx('h-6 w-6', correct ? 'text-custom-green' : 'text-gray-300')}
                        onClick={() => handleSave(!correct)}
                    />
                </span>
            </span>
        );
    };

    return (
        <Container>
            <Headline headlineText={quiz.title as string} subHeadlineText="Creating quiz" />

            <div className="my-8">
                <Process step={step} />
                <div className="flex flex-row gap-5">
                    <Button onClick={() => console.log(JSON.stringify(quiz, null, 2))}>
                        State
                    </Button>
                </div>
            </div>

            <div className="mt-10">
                <div className="text-center text-2xl font-semibold">
                    <span className="py-4 block">
                        <QuestionInput questionId={qId} />
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <AnswerInput optionId={uuid()} questionId={qId} />
                    <AnswerInput optionId={uuid()} questionId={qId} />
                    <AnswerInput optionId={uuid()} questionId={qId} />
                    <AnswerInput optionId={uuid()} questionId={qId} />
                </div>

                <div className="flex justify-center mt-8"></div>
            </div>
        </Container>
    );
};

export default CreateQuizPage;
