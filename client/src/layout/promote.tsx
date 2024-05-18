import { useState } from 'react';
import { Text }  from '../components/text';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useStrings } from '../hooks/useStrings';

const Promote = () => {
    const strings = useStrings();
    const [show, setShow] = useState(true);

    const handleDismiss = () => {
        setShow(false);
    };

    return (
        <div
            className={`transition-all duration-75 relative isolate ${
                show ? `flex` : 'hidden'
            } items-center gap-x-6 overflow-hidden bg-gray-50 dark:bg-slate-900/30 px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}
        >
            <div
                className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                />
            </div>
            <div
                className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm leading-6 text-gray-900 dark:text-white">
                    <Text className="font-semibold inline-block">{strings.promoteBannerTitle}</Text>
                    <svg
                        viewBox="0 0 2 2"
                        className="mx-2 inline h-0.5 w-0.5 fill-current"
                        aria-hidden="true"
                    >
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    <Text className="inline-block">{strings.promoteBannerDescription}</Text>
                </span>
                <a
                    href="https://twitch.tv/ilostmymedic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-none rounded-full bg-container-dark px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                    {strings.promoteBannerButtonText} <span aria-hidden="true">&rarr;</span>
                </a>
            </div>
            <div className="flex flex-1 justify-end">
                <button
                    type="button"
                    className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                    onClick={handleDismiss}
                >
                    <span className="sr-only">{strings.promoteBannerDismissSR}</span>
                    <XMarkIcon
                        className="h-5 w-5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    );
}


export default Promote