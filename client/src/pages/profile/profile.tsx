import { useState, useEffect } from 'react';
import Container from '../../layout/container'
import Headline from '../../components/headline';
import { useAuth0 } from '@auth0/auth0-react';
import Empty from './components/empty';
import { Strong } from '../../components/text';
import axios from 'axios';
import { IQuiz } from '../../interfaces/quiz';
import Preview from './components/preview';
import { v4 as uuid } from 'uuid';
import clsx from 'clsx';
import { Divider } from '../../components/divider';

interface ISort {
    direction: 'asc' | 'desc';
    sortBy: 'createdAt' | 'ratings' | 'title' | 'description' | 'updatedAt';
}

const ProfilePage = () => {
    const { user } = useAuth0();
    const [quizzes, setQuizzes] = useState([] as IQuiz[]);

    const tabs = [
        { name: 'My Quizzes', href: '#', current: true },
        { name: 'Liked', href: '#', current: false },
        { name: 'Playlists', href: '#', current: false },
        { name: 'Badges', href: '#', current: false}
    ];

    const sortFilter = (sort: ISort, quiz: IQuiz[]) => {
        const compare = (a: any, b: any) => {
            let valueA = a[sort.sortBy];
            let valueB = b[sort.sortBy];

            if (valueA === undefined || valueB === undefined) return 0;

            if (typeof valueA === 'string') valueA = valueA.toLowerCase();
            if (typeof valueB === 'string') valueB = valueB.toLowerCase();

            if (sort.direction === 'asc') {
                if (valueA > valueB) return 1;
                if (valueA < valueB) return -1;
                return 0;
            } else {
                if (valueA < valueB) return 1;
                if (valueA > valueB) return -1;
                return 0;
            }
        };

        return quiz.sort(compare);
    };

    useEffect(() => {
        if (!user?.sub) {
            return;
        }
        const fetchQuizzes = async () => {
            try {

                const response = await axios.get('/api/search/myquiz', {
                    params: {
                        ownerId: '66460b784901e7613d6b5663',
                    },
                });

                const data = response.data;
                const sortedData = sortFilter({ direction: 'asc', sortBy: 'title' }, data);
                setQuizzes(sortedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizzes();
    }, [user]);

    return (
        <Container>
            <div className="flex flex-row items-center">
                <img src={user?.picture} alt={user?.name} className="rounded-full w-28 mr-4" />
                <Headline headlineText={user?.nickname ?? 'Anonymous'} subHeadlineText='Your profile' />
            </div>

            <Divider />

            {/* Content */}
            <div className="mt-10">
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        SR
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                        defaultValue={tabs.find((tab) => tab.current)?.name ?? ''}
                    >
                        {tabs.map((tab) => (
                            <option key={uuid()}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <a
                                key={uuid()}
                                href={tab.href}
                                className={clsx(
                                    tab.current
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-500 hover:text-gray-700',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
            {
                quizzes.length === 0 ? (
                    <div className="mt-10">
                        <Strong>Quizzes</Strong>
                        <Empty className="mt-4" />
                    </div>
                ) : (
                    <div className="mt-10">
                        <Strong>Quizzes</Strong>
                        <Preview quizzes={quizzes} />
                    </div>
                )
            }
        </Container>
    );
};

export default ProfilePage;
