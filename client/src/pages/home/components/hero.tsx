import { useRef, useState } from 'react';
import { Button } from '../../../components/button';
import { useNavigate } from 'react-router-dom';
import routes from '../../../routes/paths';
import { Text } from '../../../components/text';
import { Input } from '../../../components/input';
import { useStrings } from '../../../hooks/useStrings';

const Hero = () => {
    const strings = useStrings();
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const roomRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _gamePin = roomRef.current?.value;

        // redirect to search page
        setError('Room not found. Please enter a valid game pin.');

        console.log(_gamePin);
    };

    const discover = () => {
        navigate(routes.discover.root);
    };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    {/* top */}
                    <Text className="relative rounded-full px-3 py-1 text-sm sm:text-sm leading-6 text-gray-600 ring-1 ring-gray-900/20 dark:ring-gray-500/20 hover:ring-gray-900/20">
                        {strings.homePageBannerTitle}{' '}
                        <a href="#" className="font-semibold text-primary">
                            <span className="absolute inset-0" aria-hidden="true" />
                            {strings.homePageBannerLink} <span aria-hidden="true">&rarr;</span>
                        </a>
                    </Text>
                </div>
                <div className="text-center">
                    {/* main */}
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                        {strings.homePageTitle}
                    </h1>
                    <Text className="mt-6 leading-8">
                        {strings.homePageDescription}
                    </Text>

                    <form className="mt-10" onSubmit={(e) => handleSearch(e)}>
                        <p className="text-custom-red text-lg font-semibold mb-5 h-8">{error}</p>
                        <div className="items-center justify-center gap-x-6 flex flex-col sm:flex-row">
                            <label htmlFor="search" className="sr-only">
                                {strings.homePageGameInputSR}
                            </label>
                            <Input
                                id="room"
                                name="room"
                                className="w-full uppercase font-bold sm:w-auto text-xl sm:text-xl block sm:leading-6"
                                placeholder={strings.homePageGameInputPlaceholder}
                                type="search"
                                ref={roomRef}
                                autoComplete="off"
                            />
                            <Button
                                color="primary"
                                type="submit"
                                className="text-xl sm:text-xl mt-5 sm:mt-0 w-full sm:w-auto"
                            >
                                {strings.homePageGameInputButton}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <Button outline className="w-full sm:w-auto" onClick={() => discover()}>
                            {strings.homePageDiscoverMore}
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
        </div>
    );
};

export default Hero;
