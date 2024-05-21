import { useState, useEffect } from 'react';
import Container from '../../layout/container'
import Headline from '../../components/headline';
import { useAuth0 } from '@auth0/auth0-react';
import Empty from './components/empty';
import { Strong } from '../../components/text';
import axios from 'axios';
import { IQuiz } from '../../interfaces/quiz';
import Preview from './components/preview';

const ProfilePage = () => {
    const { user } = useAuth0();
    const [quizzes, setQuizzes] = useState([] as IQuiz[]);

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

                setQuizzes(response.data);
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

            {/* Content */}
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
