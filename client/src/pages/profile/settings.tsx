import Container from '../../layout/container';
import { LabelDivider } from '../../components/divider';
import DeleteAccount from './components/DeleteAccount';
import Headline from '../../components/headline';
import { useAuth0 } from '@auth0/auth0-react';

const SettingsPage = () => {
    const { user } = useAuth0();

    return (
        <Container>
            <Headline headlineText='Settings' subHeadlineText={user?.nickname ?? 'Anonymous'} />
            <LabelDivider label="Danger Zone" id="DangerZone" />
            <DeleteAccount />
        </Container>
    );
};

export default SettingsPage;
