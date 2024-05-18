import { Fragment, useState, useRef } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon, FolderIcon, LifebuoyIcon } from '@heroicons/react/24/outline';
import { fullPaths } from '../routes/paths';
import { useNavigate } from 'react-router-dom';
import { Text, Strong } from './text'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const CommandNavigation = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [rawQuery, setRawQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const query = rawQuery.toLowerCase().replace(/^[#>]/, '');

    // from fullpath, give an id, set the name and url = path
    const pages = fullPaths.map((page, index) => ({
        id: index,
        name: page.name,
        url: page.path,
    }));

    const users = [
        {
            id: 1,
            name: 'Leslie Alexander',
            url: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ];

    const filteredPages =
        rawQuery === '#'
            ? pages
            : query === '' || rawQuery.startsWith('>')
              ? []
              : pages.filter((page) => page.name.toLowerCase().includes(query));

    const filteredUsers =
        rawQuery === '>'
            ? users
            : query === '' || rawQuery.startsWith('#')
              ? []
              : users.filter((user) => user.name.toLowerCase().includes(query));

    // if ctrl + k or cmd + k is pressed
    // open the dialog
    // else close the dialog
    window.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            setOpen(true);
            
            inputRef.current?.focus();

        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    });

    interface IUrl {
        url: string;
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment} afterLeave={() => setRawQuery('')} appear>
                <Dialog as="div" className="relative z-50 dark:text-gray-300" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-main-dark bg-opacity-80 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 dark:divide-white/10 overflow-hidden rounded-xl bg-container-light dark:bg-container-dark shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                                <Combobox
                                    onChange={(item: IUrl) => {
                                        setOpen(false);
                                        navigate(item.url);
                                    }}
                                >
                                    <div className="relative">
                                        <MagnifyingGlassIcon
                                            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <Combobox.Input
                                            className="h-12 w-full border-0 bg-transparent pl-11 pr-4 placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:focus:ring-white/10"
                                            placeholder="Search..."
                                            onChange={(event) => setRawQuery(event.target.value)}
                                            ref={inputRef}
                                        />
                                    </div>

                                    {(filteredPages.length > 0 || filteredUsers.length > 0) && (
                                        <Combobox.Options
                                            static
                                            className="max-h-80 transform-gpu scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2 list-none"
                                        >
                                            {filteredPages.length > 0 && (
                                                <li>
                                                    <Strong className="text-sm font-semibold">
                                                        Pages
                                                    </Strong>
                                                    <ul className="-mx-4 mt-2 text-sm">
                                                        {filteredPages.map((page) => (
                                                            <Combobox.Option
                                                                key={page.id}
                                                                value={page}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        'flex cursor-default items-center px-4 py-2',
                                                                        active &&
                                                                            'bg-primary text-white'
                                                                    )
                                                                }
                                                            >
                                                                {({ active }) => (
                                                                    <>
                                                                        <FolderIcon
                                                                            className={classNames(
                                                                                'h-6 w-6 flex-none',
                                                                                active
                                                                                    ? 'text-white'
                                                                                    : 'text-gray-400'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        <Text className="ml-3 flex-auto truncate">
                                                                            {page.name}
                                                                        </Text>
                                                                    </>
                                                                )}
                                                            </Combobox.Option>
                                                        ))}
                                                    </ul>
                                                </li>
                                            )}
                                            {filteredUsers.length > 0 && (
                                                <li>
                                                    <Strong className="text-sm font-semibold">
                                                        Users
                                                    </Strong>
                                                    <ul className="-mx-4 mt-2 text-sm">
                                                        {filteredUsers.map((user) => (
                                                            <Combobox.Option
                                                                key={user.id}
                                                                value={user}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        'flex cursor-default select-none items-center px-4 py-2',
                                                                        active &&
                                                                            'bg-primary text-white'
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={user.imageUrl}
                                                                    alt=""
                                                                    className="h-6 w-6 flex-none rounded-full"
                                                                />
                                                                <Text className="ml-3 flex-auto truncate">
                                                                    {user.name}
                                                                </Text>
                                                            </Combobox.Option>
                                                        ))}
                                                    </ul>
                                                </li>
                                            )}
                                        </Combobox.Options>
                                    )}

                                    {rawQuery === '?' && (
                                        <div className="px-6 py-14 text-center text-sm sm:px-14">
                                            <LifebuoyIcon
                                                className="mx-auto h-6 w-6 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <Text className="mt-4 font-semibold">
                                                Help with searching
                                            </Text>
                                            <Text className="mt-2">
                                                Use this tool to quickly search for users and
                                                projects across our entire platform. You can also
                                                use the search modifiers found in the footer below
                                                to limit the results to just users or projects.
                                            </Text>
                                        </div>
                                    )}

                                    {query !== '' &&
                                        rawQuery !== '?' &&
                                        filteredPages.length === 0 &&
                                        filteredUsers.length === 0 && (
                                            <div className="px-6 py-14 text-center text-sm sm:px-14">
                                                <ExclamationTriangleIcon
                                                    className="mx-auto h-6 w-6 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <Text className="mt-4 font-semibold">
                                                    No results found
                                                </Text>
                                                <Text className="mt-2">
                                                    We couldn’t find anything with that term. Please
                                                    try again.
                                                </Text>
                                            </div>
                                        )}

                                    <div className="flex flex-wrap items-center bg-container-light dark:bg-container-dark px-4 py-2.5 text-xs text-gray-700 dark:text-gray-300">
                                        Type{' '}
                                        <kbd
                                            className={classNames(
                                                'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-container-light dark:bg-main-dark font-semibold sm:mx-2',
                                                rawQuery.startsWith('#')
                                                    ? 'border-primary text-primary'
                                                    : 'border-gray-400 dark:border-white/10 text-gray-900 dark:text-gray-200'
                                            )}
                                        >
                                            #
                                        </kbd>{' '}
                                        <span className="sm:hidden">for pages,</span>
                                        <span className="hidden sm:inline">to access pages,</span>
                                        <kbd
                                            className={classNames(
                                                'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-container-light dark:bg-main-dark font-semibold sm:mx-2',
                                                rawQuery.startsWith('>')
                                                    ? 'border-primary text-primary'
                                                    : 'border-gray-400 dark:border-white/10 text-gray-900 dark:text-gray-200'
                                            )}
                                        >
                                            &gt;
                                        </kbd>{' '}
                                        for users, and{' '}
                                        <kbd
                                            className={classNames(
                                                'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-container-light dark:bg-main-dark font-semibold sm:mx-2',
                                                rawQuery === '?'
                                                    ? 'border-primary text-primary'
                                                    : 'border-gray-400 dark:border-white/10 text-gray-900 dark:text-gray-200'
                                            )}
                                        >
                                            ?
                                        </kbd>{' '}
                                        for help.
                                    </div>
                                </Combobox>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {children}
        </>
    );
};

export default CommandNavigation;
