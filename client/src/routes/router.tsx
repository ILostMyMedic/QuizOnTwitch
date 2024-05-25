import routes from './paths';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';

// INDEX ===========================
import HomePage from '../pages/home';
import DiscoverPage from '../pages/discover';
import LeaderboardPage from '../pages/leaderboard';
import TestPage from '../pages/test';
// =================================

// PROFILE =========================
import {CreateQuizPage} from '../pages/quiz';
// =================================

// PROFILE =========================
import { ProfilePage, SettingsPage } from '../pages/profile';
// =================================


// MISC =============================
import { TermsPage, PrivacyPage, PackagesPage, CreditsPage } from '../pages/legal';
import AuthCallback from './Auth';
import ErrorPage from '../pages/error';
// =================================

const RouterComponent = createBrowserRouter([
    {
        path: routes.root,
        element: <Layout />,
        children: [
            { path: routes.root, element: <HomePage /> },
            { path: routes.discover.root, element: <DiscoverPage /> },
            { path: routes.leaderboard.root, element: <LeaderboardPage /> },

            { path: routes.quiz.create, element: <CreateQuizPage /> },

            { path: routes.profile.root, element: <ProfilePage /> },
            { path: routes.profile.settings, element: <SettingsPage /> },

            { path: routes.legal.terms, element: <TermsPage /> },
            { path: routes.legal.privacy, element: <PrivacyPage /> },
            { path: routes.legal.packages, element: <PackagesPage /> },
            { path: routes.legal.credits, element: <CreditsPage /> },

            { path: routes.auth.callback, element: <AuthCallback /> },

            { path: routes.test.root, element: <TestPage /> },
            { path: routes.error, element: <ErrorPage /> },
        ],
    },
]);

export default RouterComponent;
