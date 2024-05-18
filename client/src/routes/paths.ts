const routes = {
    root: `/`,
    domain: `http://localhost:3000`,

    discover: {
        root: `/discover`,
    },
    leaderboard: {
        root: `/leaderboard`,
    },
    quiz: {
        root: `/quiz`,
        create: `/quiz/create`,
        edit: `/quiz/edit`,
        play: `/quiz/play/:id`,
    },

    profile: {
        root: `/u/:id`,
        settings: `/settings`,
    },

    test: {
        root: `/test`,
    },

    auth: {
        callback: `/auth/callback`,
        login: `/login`,
        logout: `/logout`,
    },
    legal: {
        root: `/legal`,
        terms: `/legal/terms`,
        cookies: `/legal/privacy`,
        privacy: `/legal/privacy`,
        packages: `/legal/packages`,
        credits: `/legal/credits`,
    },
    error: `*`,
};

export const fullPaths = [
    { name: `Home`, path: routes.root },
    { name: `Discover`, path: routes.discover.root },
    { name: `Leaderboard`, path: routes.leaderboard.root },
    { name: `Quiz`, path: routes.quiz.root },
    { name: `Create quiz`, path: routes.quiz.create },
    { name: `Edit quiz`, path: routes.quiz.edit },
    { name: `Join quiz`, path: routes.quiz.play },
    { name: `Profile`, path: routes.profile.root },
    { name: `Settings`, path: routes.profile.settings },
    { name: `Test`, path: routes.test.root },
];

export default routes;
