import Container from '../../layout/container'
import Headline from '../../components/headline';
import { useAuth0 } from '@auth0/auth0-react';
import Empty from './components/empty';
import { Strong } from '../../components/text';

const ProfilePage = () => {
    const { user } = useAuth0();

    return (
        <Container>
            <div className="flex flex-row items-center">
                <img src={user?.picture} alt={user?.name} className="rounded-full w-28 mr-4" />
                <Headline headlineText={user?.nickname ?? 'Anonymous'} subHeadlineText='Your profile' />
            </div>

            {/* Content */}
            <div className="mt-10">
                <Strong>Quizzes</Strong>
                <Empty className="mt-4" />
            </div>
        </Container>
    );
};

export default ProfilePage;
