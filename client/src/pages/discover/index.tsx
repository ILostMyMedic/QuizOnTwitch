import { Fragment, useState, useEffect, useMemo } from 'react';
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import {
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, ClockIcon, HeartIcon, SparklesIcon } from '@heroicons/react/20/solid';
import Headline from '../../components/headline';
import Preview from './components/preview';
import FullSet from './components/fullset';
import { useLocation } from 'react-router-dom';
import ButtonDivider from '../../components/buttonDivider';
import { Text } from '../../components/text';
import axios from 'axios';
import { IQuiz, IQuizSearch } from '../../interfaces/quiz';
import { useAuth0 } from '@auth0/auth0-react';
import { LoadingSmall as Loading } from '../../layout/loading';
import { v4 as uuid } from 'uuid';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
interface ISort {
    direction: 'asc' | 'desc';
    sortBy: 'createdAt' | 'ratings' | 'title' | 'description' | 'updatedAt';
}

interface IActiveFilter {
    id: string; // for ensuring uniqueness
    value: string; // for code to read
    label: string; // for human to read
}
interface IQuizDiscover {
    popular: IQuiz[];
    newest: IQuiz[];
    lastPlayed: IQuiz[];
}

const FilterIds = {
    sortBy: uuid(),
    questions: uuid(),
    ratings: uuid(),
}

const sortByOptions = [
    { value: 'title', label: 'Title' },
    { value: 'description', label: 'Description' },
    { value: 'ratings', label: 'Most Popular' },
    { value: 'createdAt', label: 'Newest' },
];

const Discover = () =>{
    const { isLoading } = useAuth0();
    const location = useLocation();
    const [isQuizLoading, setIsQuizLoading] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchFilter, setSearchFilter] = useState<IQuizSearch>({});
    const [activeFilters, setActiveFilters] = useState<IActiveFilter[]>([]);
    const [quiz, setQuiz] = useState<IQuizDiscover>({
        popular: [],
        newest: [],
        lastPlayed: [],
    });

    const sortOptions = [
        { name: 'Title', sort: { direction: 'desc', sortBy: 'title' } as ISort, current: true },
        { name: 'Description', sort: { direction: 'desc', sortBy: 'description' } as ISort, current: false },
        {
            name: 'Most Popular',
            sort: { direction: 'desc', sortBy: 'ratings' } as ISort,
            current: false,
        },
        {
            name: 'Newest',
            sort: { direction: 'desc', sortBy: 'createdAt' } as ISort,
            current: false,
        },
    ];
    const filters = [
        {
            id: 'category',
            name: 'Category',
            options: [
                { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
                { value: 'tees', label: 'Tees', checked: false },
                { value: 'objects', label: 'Objects', checked: true },
            ],
        },
        {
            id: 'color',
            name: 'Color',
            options: [
                { value: 'white', label: 'White', checked: false },
                { value: 'beige', label: 'Beige', checked: false },
                { value: 'blue', label: 'Blue', checked: false },
            ],
        },
        {
            id: 'sizes',
            name: 'Sizes',
            options: [
                { value: 's', label: 'S', checked: false },
                { value: 'm', label: 'M', checked: false },
                { value: 'l', label: 'L', checked: false },
            ],
        },
    ];


    const addActiveFilter = (option: IActiveFilter) => {
        const { id } = option;
        // remove the already existing filter
        const newFilters = activeFilters.filter((filter) => filter.id !== id);
        setActiveFilters([...newFilters, option]);
    };
    const removeActiveFilter = (option: IActiveFilter) => {
        setActiveFilters(activeFilters.filter((filter) => filter.id !== option.id));
    };

    const sortFilter = (sort: ISort, quiz: IQuizDiscover) => {
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

        const sortedPopularQuiz = quiz.popular.sort(compare);
        const sortedNewestQuiz = quiz.newest.sort(compare);
        const sortedRecentQuiz = quiz.lastPlayed.sort(compare);

        const sortByLabel = sortByOptions.find((option) => option.value === sort.sortBy)

        addActiveFilter({
            id: FilterIds.sortBy,
            value: sort.sortBy,
            label: `Sort by ${sortByLabel?.label as string}`,
        });

        setQuiz({
            popular: sortedPopularQuiz,
            newest: sortedNewestQuiz,
            lastPlayed: sortedRecentQuiz,
        });
    }


    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('/api/search/discover', {
                // params: searchFilter,
            });
            sortFilter(
                { direction: 'asc', sortBy: 'title' },
                {
                    popular: response.data.popular,
                    newest: response.data.newest,
                    lastPlayed: response.data.lastPlayed,
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(isLoading) return;
        fetchQuizzes();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchVal = searchParams.get('q');
        
        if (searchVal && searchVal !== '') {
            setSearch(searchVal);
        } else {
            setSearch('');
        }

    }, [location.search]);

    const handleSearch = (e: any) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (quiz.popular.length > 0 && quiz.newest.length > 0) {
            setIsQuizLoading(false);
        }
    }, [quiz]);

    const RenderPreview = () => {
        return isQuizLoading ? (
            <Loading />
        ) : (
            quiz.popular.length > 0 || 
            quiz.newest.length > 0 ||
            quiz.lastPlayed.length > 0 ? (
                <>
                    {quiz.lastPlayed.length > 0 && (
                        <div className="mb-10">
                            <Text className="mx-auto max-w-8xl px-4 pb-4 sm:pb-10 lg:pb-8 sm:px-6 lg:max-w-8xl lg:px-8 flex items-center gap-x-3 sm:text-xl font-semibold leading-7 text-gray-900">
                                <ClockIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                Recently played
                            </Text>
                            <Preview quizzes={quiz.lastPlayed} />
                            <ButtonDivider
                                buttonText="Load More"
                                onClick={() => console.log('Load More')}
                            />
                        </div>
                    )}

                    {quiz.popular.length > 0 && (
                        <div className="mb-10">
                            <Text className="mx-auto max-w-8xl px-4 pb-4 sm:pb-10 lg:pb-8 sm:px-6 lg:max-w-8xl lg:px-8 flex items-center gap-x-3 sm:text-xl font-semibold leading-7 text-gray-900">
                                <HeartIcon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                Most liked
                            </Text>
                            <Preview quizzes={quiz.popular} />
                            <ButtonDivider
                                buttonText="Load More"
                                onClick={() => console.log('Load More')}
                            />
                        </div>
                    )}

                    {quiz.newest.length > 0 && (
                        <div className="">
                            <Text className="mx-auto max-w-8xl px-4 pb-4 sm:pb-10 lg:pb-8 sm:px-6 lg:max-w-8xl lg:px-8 flex items-center gap-x-3 sm:text-xl font-semibold leading-7 text-gray-900">
                                <SparklesIcon
                                    className="h-5 w-5 flex-none text-primary"
                                    aria-hidden="true"
                                />
                                New Arrivals
                            </Text>
                            <Preview quizzes={quiz.newest} />
                            <ButtonDivider
                                buttonText="Load More"
                                onClick={() => console.log('Load More')}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <Text className="text-3xl font-semibold text-gray-900">No quizzes found</Text>
                </div>
            )
        );
    }

    return (
        <div className="">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog className="relative z-40 sm:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4">
                                        {filters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.name}
                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                                <span className="font-medium text-gray-900">
                                                                    {section.name}
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    <ChevronDownIcon
                                                                        className={classNames(
                                                                            open
                                                                                ? '-rotate-180'
                                                                                : 'rotate-0',
                                                                            'h-5 w-5 transform'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map(
                                                                    (option, optionIdx) => (
                                                                        <div
                                                                            key={option.value}
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                defaultValue={
                                                                                    option.value
                                                                                }
                                                                                type="checkbox"
                                                                                defaultChecked={
                                                                                    option.checked
                                                                                }
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 text-sm text-gray-500"
                                                                            >
                                                                                {option.label}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-8xl px-4 lg:max-w-8xl lg:px-8">
                    <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
                        <Headline
                            headlineText="Discover Quizzes"
                            subHeadlineText="Explore the latest quizzes and test your knowledge."
                        />
                        <Text className="mt-4">
                            Search for quizzes by title, category, or tags.
                        </Text>
                    </div>
                    <section aria-labelledby="filter-heading">
                        <h2 id="filter-heading" className="sr-only">
                            Filters
                        </h2>

                        <div className="border-b border-gray-200 dark:border-white/10 bg-container-light dark:bg-container-dark py-4">
                            <div className="mx-auto flex max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <Menu.Item key={option.name}>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => {
                                                                    sortFilter(option.sort, quiz);
                                                                }}
                                                                className={classNames(
                                                                    option.current
                                                                        ? 'font-medium text-gray-900'
                                                                        : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm w-full text-left'
                                                                )}
                                                            >
                                                                {option.name}
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <button
                                    type="button"
                                    className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    Filters
                                </button>

                                <div className="hidden sm:block">
                                    <div className="flow-root">
                                        <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                                            {filters.map((section, sectionIdx) => (
                                                <Popover
                                                    key={section.name}
                                                    className="relative inline-block px-4 text-left"
                                                >
                                                    <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                        <span>{section.name}</span>
                                                        {sectionIdx === 0 ? (
                                                            <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                                                1
                                                            </span>
                                                        ) : null}
                                                        <ChevronDownIcon
                                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                    </Popover.Button>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <form className="space-y-4">
                                                                {section.options.map(
                                                                    (option, optionIdx) => (
                                                                        <div
                                                                            key={option.value}
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                defaultValue={
                                                                                    option.value
                                                                                }
                                                                                type="checkbox"
                                                                                defaultChecked={
                                                                                    option.checked
                                                                                }
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                                className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                                                            >
                                                                                {option.label}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </form>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </Popover>
                                            ))}
                                        </Popover.Group>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Active filters */}
                        <div className="bg-gray-100 dark:bg-container-dark/60">
                            <div className="mx-auto max-w-8xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
                                <h3 className="text-sm font-medium text-gray-500">
                                    Filters
                                    <span className="sr-only">, active</span>
                                </h3>

                                <div
                                    aria-hidden="true"
                                    className="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block"
                                />

                                <div className="mt-2 sm:ml-4 sm:mt-0">
                                    <div className="-m-1 flex flex-wrap items-center">
                                        {activeFilters.map((activeFilter) => (
                                            <span
                                                key={activeFilter.value}
                                                className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                                            >
                                                <span>{activeFilter.label}</span>
                                                <button
                                                    type="button"
                                                    className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                                    onClick={() => removeActiveFilter(activeFilter)}
                                                >
                                                    <span className="sr-only">
                                                        Remove filter for {activeFilter.label}
                                                    </span>
                                                    <svg
                                                        className="h-2 w-2"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 8 8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeWidth="1.5"
                                                            d="M1 1l6 6m0-6L1 7"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="pt-4">
                        {search ? (
                            <FullSet />
                        ) : (
                            <RenderPreview />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}


export default Discover;