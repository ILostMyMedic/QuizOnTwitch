import { IStringBundle } from '../interfaces/strings';

const strings: IStringBundle = {
    // navigation ========================================
    navItemHome: 'Home',
    navItemDiscover: 'Discover',
    navItemMyQuizzes: 'My Quizzes',
    navItemLeaderboard: 'Leaderboard',
    navItemSearchPlaceholder: 'Search',
    navItemSkipToMainContent: 'Skip to main content',

    navItemProfileMenuSR: 'Open profile menu',
    navItemProfileMenuMyProfile: 'My Profile',
    navItemProfileMenuSettings: 'Settings',
    navItemProfileMenuSignout: 'Sign Out',
    navItemProfileMenuSignin: 'Sign In',

    navItemBurgerMenySR: 'Open main menu',
    navItemBurgerMenu: 'Create',
    navItemBurgerOptionCreateQuiz: 'Create',
    navItemBurgerOptionCreateQuizDescription: 'Create a new quiz to your liking.',
    navItemBurgerOptionPlaylists: 'Playlists',
    navItemBurgerOptionPlaylistsDescription: 'Create a new playlist for quizzes.',

    navItemToggleTheme: 'Toggle theme',
    navItemSelectLanguage: 'Select language',

    // Footer ===========================================
    footerTermsOfService: 'Terms of Service',
    footerPrivacyPolicy: 'Privacy Policy',
    footerPackagesAndLicenses: 'Packages and Licenses',
    footerCredits: 'Credits',
    footerCopyRight: 'All rights reserved.',

    // promote banner ===================================
    promoteBannerTitle: 'Quiz on Twitch',
    promoteBannerDescription: 'Join us for a live coding session on Twitch.',
    promoteBannerButtonText: 'Watch now',
    promoteBannerDismissSR: 'Dismiss',

    // Quiz Slideover ===================================
    quizSlideoverTitle: 'Quiz information',
    quizSlideoverDescription: 'Get started by filling in the information below about your quiz.',
    quizSlideoverClosePanelSR: 'Close panel',
    quizSlideoverTitleLabel: 'Quiz title',
    quizSlideoverTitlePlaceholder: 'Royal family',
    quizSlideoverDescriptionLabel: 'Description',
    quizSlideoverDescriptionPlaceholder: 'How much do you know about royal families in Europe?',
    quizSlideoverManageContributorsTitle: 'Manage contributors',
    quizSlideoverAddContributorsSR: 'Add contributors',
    quizSlideoverPrivateFieldLabel: 'Private quiz',
    quizSlideoverPrivateFieldDescription: 'Only contributors can access the quiz.',
    quizSlideoverPublicOptionLabel: 'Public',
    quizSlideoverPublicOptionDescription: 'Anyone can access the quiz.',
    quizSlideoverPrivateOptionLabel: 'Private',
    quizSlideoverPrivateOptionDescription: 'Only contributors can access the quiz.',
    quizSlideoverCopyLinkButton: 'Copy link',
    quizSlideoverCancelButton: 'Cancel',
    quizSlideoverNextButton: 'Next',

    quizSlideoverErrorTitle: 'Title is required',
    quizSlideoverErrorDescription: 'Description is required',

    // home ==============================================
    homePageBannerTitle: 'Create your own quiz.',
    homePageBannerLink: 'Read more',
    homePageTitle: 'Quiz on Twitch',
    homePageDescription:
        'Play quiz games with your friends on Twitch. Create a room and invite your friends to join the game. You can also join a room by entering the game pin.',
    homePageGameInputSR: 'Game pin',
    homePageGameInputPlaceholder: 'game pin',
    homePageGameInputButton: 'Join',
    homePageGameInputError: 'Room not found. Please enter a valid game pin.',
    homePageDiscoverMore: 'Discover other quizzes',

    // Leaderboard =========================================
    leaderboardTitle: 'Leaderboard',
    leaderboardSubTitle: 'Top 50',
    leaderboardFilterSR: 'Select a tab',
    leaderboardFilterOptionMyConnections: 'My connections',
    leaderboardFilterOptionAllTime: 'All time',
    leaderboardFilterOptionMonthly: 'Monthly',
};

export default strings;
