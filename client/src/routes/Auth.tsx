import React from 'react';
import routes from './paths';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../layout/loading';

const AuthCallback = () => {
    const [token, setToken] = React.useState<string>();
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const location = useLocation();
    const navigate = useNavigate();

    // use a history search to see what the last path from this domain was
    const path = new URLSearchParams(location.search).get('redirect_uri');

    React.useEffect(() => {
        const fetchAccessToken = async () => {
            if (isAuthenticated) {
                const accessToken = await getAccessTokenSilently();
                localStorage.setItem('access_token', accessToken);
            }
        };

        fetchAccessToken().then(() => {
            navigate(path || routes.root);
        });
    }, [isAuthenticated, getAccessTokenSilently, setToken, navigate, path]);

    return <Loading />;
};

export default AuthCallback;
