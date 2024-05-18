import { useEffect, useState } from "react";

import Container from "../../layout/container"
import { IPlayer } from "./components/playerCol"
import Table from "./components/table"
import Headline from "../../components/headline"
import { TrophyIcon } from '@heroicons/react/20/solid';
import PlayerCol from "./components/playerCol";
import axios from "axios";
import { LoadingSmall as Loading } from '../../layout/loading';
import { Text, Strong } from '../../components/text';
import { useStrings } from '../../hooks/useStrings';

let players: IPlayer[] = [];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const Leaderboard = () => {
    const strings = useStrings();
    const [loading, setLoading] = useState(true);

    const tabs = [
        { name: strings.leaderboardFilterOptionMyConnections, href: '#', current: true },
        { name: strings.leaderboardFilterOptionAllTime, href: '#', current: false },
        { name: strings.leaderboardFilterOptionMonthly, href: '#', current: false },
    ];

    useEffect(() => {
        if(!loading) return;
        axios.get('/api/leaderboard?page=1&limit=10')
            .then((response) => {
                console.log(response.data);
                setLoading(false);
                players = response.data.leaderboard as IPlayer[];
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);



    return (
        <Container>
            <Headline
                headlineText={strings.leaderboardTitle}
                subHeadlineText={strings.leaderboardSubTitle}
                headlineIcon={<TrophyIcon className="w-6 h-6 text-yellow-500 mr-2" />}
            />
            <div className="mt-10">
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        {strings.leaderboardFilterSR}
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary"
                        defaultValue={tabs.find((tab) => tab.current)?.name ?? ''}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-500 hover:text-gray-700',
                                    'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex flex-row justify-between items-center mt-10 border-2 border-primary rounded-md">
                        <PlayerCol
                            player={{
                                id: 1,
                                username: 'johndoe',
                                experience: 47,
                                level: 1,
                                rank: 23,
                            }}
                        />
                    </div>

                    {players.length > 0 ? <Table players={players} /> : (
                        <div className="mt-10 text-center">
                            <Strong>No players found...</Strong>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}

export default Leaderboard;