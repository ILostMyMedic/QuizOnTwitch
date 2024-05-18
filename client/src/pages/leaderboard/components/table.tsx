import { useEffect, useState } from 'react';
import PlayerCol, { IPlayer } from './playerCol';

const Table = ({ players }: { players: IPlayer[] }) => {
    const [data, setData] = useState<IPlayer[]>([]);

    useEffect(() => {
        // sort player by score
        players.sort((a, b) => b.experience - a.experience);
        // set rank
        const playersWithRank = players.map((player, index) => ({ ...player, rank: index + 1 }));

        setData(playersWithRank);
    }, [players]);

    return (
        <div className="relative flex flex-col w-full mt-10">
            {data.map((player) => (
                <PlayerCol key={player.id} player={player} />
            ))}
        </div>
    )
}

export default Table;