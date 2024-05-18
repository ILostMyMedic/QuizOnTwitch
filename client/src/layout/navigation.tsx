import { useRef } from 'react';
import { Disclosure, } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { SunIcon, MoonIcon, LanguageIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import routes from '../routes/paths';
import logo from '../assets/images/initialsLogo.svg';
import localSettings from '../local.settings.json';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Dropdown,
    DropdownButton,
    DropdownMenu,
    DropdownItem,
    DropdownSeparator,
    DropdownLabel,
    DropdownDescription,
} from '../components/dropdown';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/button';
import { toggleMode } from '../store/reducers/themeReducer';
import { RootState } from '../store';
import { useStrings } from '../hooks/useStrings';
import { clsx } from 'clsx';
import { setLanguage } from '../store/reducers/languageReducer';
import { toggleMenu } from '../store/reducers/quizReducer';
import { Input } from '../components/input';
import { v4 as uuid } from 'uuid';

const classes = {
    desktop: {
        active: 'border-primary text-gray-900 dark:text-white',
        default: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-100',
    },
    mobile: {
        active: 'border-l-4 border-primary bg-primary/15 py-2 pl-3 pr-4 text-base font-medium text-primary',
        default:
            'border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
    },
};

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const Navigation = () => {
    const strings = useStrings();
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const language = useSelector((state: RootState) => state.language.language);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const redirect_uri = `?redirect_uri=${location.pathname || '/'}`;

    const navigation = [
        { name: strings.navItemHome, href: routes.root },
        { name: strings.navItemDiscover, href: routes.discover.root },
        { name: strings.navItemMyQuizzes, href: routes.quiz.root },
        { name: strings.navItemLeaderboard, href: routes.leaderboard.root },
    ];

    const languageOptions = [
        { name: 'English', value: 'en-US' },
        { name: 'Norwegian', value: 'nb-NO' },
        { name: 'Spanish', value: 'es-ES' },
        { name: 'German', value: 'de-DE' },
        { name: 'French', value: 'fr-FR' },
        { name: 'Italian', value: 'it-IT'}
    ];


    const toggleModeHandler = () => {
        dispatch(toggleMode());
    };

    const toggleQuizContext = () => {
        dispatch(toggleMenu());
    }

    const setContextLanguage = (lang: string) => {
        dispatch(setLanguage(lang));
    }

    // create a ref to the search input
    const searchInput = useRef<HTMLInputElement>(null);

    // handle search form submission
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchQuery = searchInput.current?.value;

        // redirect to search page
        navigate(`${routes.discover.root}?q=${searchQuery}`);
    };

    const skipToContent = () => {
        // skip tabbing to the div with id="content"
        const doc = document.getElementById('content');
        if(!doc) return;

        doc.tabIndex = -1;
        doc.focus();
    };


    return (
        <Disclosure as="nav" className="shadow relative z-40">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-8xl px-2 sm:px-4 lg:px-8">
                        <div className="flex h-16 justify-between">
                            {/* selft align vertical center */}
                            <button
                                className="absolute inset-y-0 left-0 flex items-center opacity-0 pointer-events-none focus:pointer-events-auto focus:opacity-100"
                                onClick={() => skipToContent()}
                            >
                                {strings.navItemSkipToMainContent}
                            </button>
                            <div className="flex px-2 lg:px-0">
                                <NavLink
                                    to={routes.root}
                                    className="flex flex-shrink-0 items-center"
                                >
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}
                                        alt={localSettings.appName}
                                    />
                                </NavLink>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={uuid()}
                                            to={item.href}
                                            end
                                            className={({ isActive }) =>
                                                classNames(
                                                    isActive
                                                        ? classes.desktop.active
                                                        : classes.desktop.default,
                                                    'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-4'
                                                )
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                <form
                                    className="w-full max-w-lg lg:max-w-xs"
                                    onSubmit={(e) => handleSearch(e)}
                                >
                                    <label htmlFor="search" className="sr-only">
                                        {strings.navItemSearchPlaceholder}
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="search"
                                            name="search"
                                            placeholder={strings.navItemSearchPlaceholder}
                                            type="search"
                                            ref={searchInput}
                                            autoComplete="off"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">{strings.navItemBurgerMenySR}</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                {/* Profile dropdown */}
                                {isAuthenticated ? (
                                    <>
                                        <Dropdown>
                                            <DropdownButton
                                                plain
                                                className={`px-0 py-0 sm:px-0 sm:py-0 rounded-full sm:rounded-full bg-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                                            >
                                                <span className="sr-only">
                                                    {strings.navItemProfileMenuSR}
                                                </span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={
                                                        user?.picture ||
                                                        'https://via.placeholder.com/150'
                                                    }
                                                    alt=""
                                                />
                                            </DropdownButton>
                                            <DropdownMenu
                                                anchor="bottom end"
                                                className="z-50 bg-white"
                                            >
                                                <DropdownItem
                                                    href={routes.profile.root.replace(':id', '1')}
                                                >
                                                    <DropdownLabel>
                                                        {strings.navItemProfileMenuMyProfile}
                                                    </DropdownLabel>
                                                </DropdownItem>

                                                <DropdownItem href={routes.profile.settings}>
                                                    <DropdownLabel>
                                                        {strings.navItemProfileMenuSettings}
                                                    </DropdownLabel>
                                                </DropdownItem>

                                                <DropdownSeparator />
                                                <DropdownItem
                                                    onClick={() => {
                                                        logout({
                                                            logoutParams: {
                                                                returnTo: `${window.location.origin}/auth/callback${redirect_uri}`,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    <DropdownLabel>
                                                        {strings.navItemProfileMenuSignout}
                                                    </DropdownLabel>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>

                                        <div
                                            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/20 mx-4"
                                            aria-hidden="true"
                                        ></div>

                                        {/* Notification dropdown */}
                                        <Dropdown>
                                            <DropdownButton color="primary">
                                                {strings.navItemBurgerMenu}
                                                <ChevronDownIcon className={`text-white`} />
                                            </DropdownButton>
                                            <DropdownMenu
                                                anchor="bottom end"
                                                className="z-50 bg-white"
                                            >
                                                <DropdownItem onClick={() => toggleQuizContext()}>
                                                    <DropdownLabel>
                                                        {strings.navItemBurgerOptionCreateQuiz}
                                                    </DropdownLabel>
                                                    <DropdownDescription>
                                                        {
                                                            strings.navItemBurgerOptionCreateQuizDescription
                                                        }
                                                    </DropdownDescription>
                                                </DropdownItem>

                                                <DropdownItem href={routes.quiz.edit}>
                                                    <DropdownLabel>
                                                        {strings.navItemBurgerOptionPlaylists}
                                                    </DropdownLabel>
                                                    <DropdownDescription>
                                                        {
                                                            strings.navItemBurgerOptionPlaylistsDescription
                                                        }
                                                    </DropdownDescription>
                                                </DropdownItem>

                                                {/* <DropdownSeparator />
                                                <DropdownItem href={routes.test.root}>
                                                    <DropdownLabel>Delete</DropdownLabel>
                                                    <DropdownDescription>
                                                        Delete a Quiz.
                                                    </DropdownDescription>
                                                </DropdownItem> */}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </>
                                ) : (
                                    <Button
                                        color="primary"
                                        onClick={() =>
                                            loginWithRedirect({
                                                authorizationParams: {
                                                    redirect_uri: `${window.location.origin}/auth/callback${redirect_uri}`,
                                                },
                                            })
                                        }
                                    >
                                        {strings.navItemProfileMenuSignin}
                                    </Button>
                                )}

                                {/* create a switch between dark and light theme */}
                                <div
                                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-transparent mx-4"
                                    aria-hidden="true"
                                ></div>

                                <button
                                    className={clsx(
                                        `flex rounded-full w-12 border-2 border-black p-1 dark:border-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-primary`,
                                        isDarkMode
                                            ? 'bg-white/5 justify-start'
                                            : 'bg-gray-200 justify-end'
                                    )}
                                    onClick={toggleModeHandler}
                                >
                                    <span className="sr-only">{strings.navItemToggleTheme}</span>
                                    {isDarkMode ? (
                                        <SunIcon className="w-4 text-gray-500 " />
                                    ) : (
                                        <MoonIcon className="w-4" />
                                    )}
                                </button>

                                <div className="px-2"></div>

                                <Dropdown>
                                    <DropdownButton plain>
                                        <span className="sr-only">
                                            {strings.navItemSelectLanguage}
                                        </span>
                                        <div className="w-6">
                                            <LanguageIcon />
                                        </div>
                                        <span>
                                            {
                                                languageOptions.find(
                                                    (option) => option.value === language
                                                )?.name
                                            }
                                        </span>
                                        <ChevronDownIcon className={`text-white`} />
                                    </DropdownButton>
                                    <DropdownMenu anchor="bottom end" className="z-50 bg-white">
                                        {languageOptions.map((option) => (
                                            <DropdownItem
                                                key={uuid()}
                                                onClick={() => setContextLanguage(option.value)}
                                            >
                                                <DropdownLabel className="flex flex-row group">
                                                    {option.value === language && (
                                                        <CheckCircleIcon className="w-4 mr-2 text-primary group-hover:text-white" />
                                                    )}
                                                    {option.name}
                                                </DropdownLabel>
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {navigation.map((item) => (
                                <NavLink
                                    key={uuid()}
                                    to={item.href}
                                    className={({ isActive }) =>
                                        classNames(
                                            isActive
                                                ? classes.mobile.active
                                                : classes.mobile.default,
                                            'block'
                                        )
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 pb-3 pt-4">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={
                                                    user?.picture ||
                                                    'https://via.placeholder.com/150'
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">
                                                {user?.nickname || 'Anonymous'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        <Disclosure.Button
                                            as="a"
                                            href={routes.profile.root.replace(
                                                ':id',
                                                user?.name || 'anonymous'
                                            )}
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            {strings.navItemProfileMenuMyProfile}
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            as="a"
                                            href="#"
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            {strings.navItemProfileMenuSettings}
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            as="a"
                                            href="#"
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                        >
                                            {strings.navItemProfileMenuSignout}
                                        </Disclosure.Button>
                                    </div>
                                </>
                            ) : (
                                <div className="px-4">
                                    <Button
                                        color="primary"
                                        className="w-full mx-auto"
                                        onClick={() =>
                                            loginWithRedirect({
                                                authorizationParams: {
                                                    redirect_uri: `${window.location.origin}/auth/callback${redirect_uri}`,
                                                },
                                            })
                                        }
                                    >
                                        {strings.navItemProfileMenuSignin}
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row border-t border-gray-200 pb-3 pt-4">
                            <Dropdown>
                                <DropdownButton color="primary">
                                    {strings.navItemBurgerMenu}
                                    <ChevronDownIcon className={`text-white`} />
                                </DropdownButton>
                                <DropdownMenu anchor="bottom end" className="z-50 bg-white">
                                    <DropdownItem href={routes.quiz.create}>
                                        <DropdownLabel>
                                            {strings.navItemBurgerOptionCreateQuiz}
                                        </DropdownLabel>
                                        <DropdownDescription>
                                            {strings.navItemBurgerOptionCreateQuizDescription}
                                        </DropdownDescription>
                                    </DropdownItem>

                                    <DropdownItem href={routes.quiz.edit}>
                                        <DropdownLabel>
                                            {strings.navItemBurgerOptionPlaylists}
                                        </DropdownLabel>
                                        <DropdownDescription>
                                            {strings.navItemBurgerOptionPlaylistsDescription}
                                        </DropdownDescription>
                                    </DropdownItem>

                                    {/* <DropdownSeparator />
                                                <DropdownItem href={routes.test.root}>
                                                    <DropdownLabel>Delete</DropdownLabel>
                                                    <DropdownDescription>
                                                        Delete a Quiz.
                                                    </DropdownDescription>
                                                </DropdownItem> */}
                                </DropdownMenu>
                            </Dropdown>

                            <div
                                className="hidden lg:block lg:h-6 lg:w-px lg:bg-transparent mx-4"
                                aria-hidden="true"
                            ></div>

                            {/* create a switch between dark and light theme */}
                            <button
                                className={clsx(
                                    `flex rounded-full w-12 border-2 border-black p-1 dark:border-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-primary`,
                                    isDarkMode
                                        ? 'bg-gray-900 justify-start'
                                        : 'bg-gray-200 justify-end'
                                )}
                                onClick={toggleModeHandler}
                            >
                                <span className="sr-only">{strings.navItemToggleTheme}</span>
                                {isDarkMode ? (
                                    <SunIcon className="w-4 text-gray-500 " />
                                ) : (
                                    <MoonIcon className="w-4" />
                                )}
                            </button>

                            <div className="px-2"></div>

                            <Dropdown>
                                <DropdownButton plain>
                                    <span className="sr-only">{strings.navItemSelectLanguage}</span>
                                    <div className="w-6">
                                        <LanguageIcon />
                                    </div>
                                    <ChevronDownIcon className={`text-white`} />
                                </DropdownButton>
                                <DropdownMenu anchor="bottom end" className="z-50 bg-white">
                                    {languageOptions.map((option) => (
                                        <DropdownItem
                                            key={uuid()}
                                            onClick={() => setContextLanguage(option.value)}
                                        >
                                            <DropdownLabel className="flex flex-row">
                                                {option.value === language && (
                                                    <CheckCircleIcon className="w-4 mr-2" />
                                                )}
                                                {option.name}
                                            </DropdownLabel>
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navigation;
