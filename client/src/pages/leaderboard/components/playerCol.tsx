import {v4 as uuid } from 'uuid';
import { Text } from '../../../components/text';

export interface IPlayer {
    id: number;
    avatar?: string;
    username: string;
    experience: number;
    level: number;
    rank?: number;
}

const PlayerCol = ({ player }: { player: IPlayer; }) => {
    return (
        <div
            key={uuid()}
            className="flex flex-row flex-1 w-full bg-container-light dark:bg-container-dark my-2 p-2 transition-all duration-75 hover:bg-primary/80 dark:hover:bg-primary/30 hover:text-white hover:color-white rounded-md items-center hover:shadow-lg"
        >
            <Text className="px-4 py-2 font-bold sm:text-3xl w-16 text-center p-6">
                {player.rank}
            </Text>
            <div className="flex flex-row align-middle items-center flex-1">
                <img
                    src={
                        player.avatar ??
                        'https://static-cdn.jtvnw.net/user-default-pictures-uv/cdd517fe-def4-11e9-948e-784f43822e80-profile_image-300x300.png'
                    }
                    alt="avatar"
                    className="w-12 h-12 rounded-full bg-gray-200"
                />
                <Text className="px-4 py-2 font-semibold">{player.username}</Text>
            </div>
            <div className="hidden sm:flex flex-col items-center py-2 px-4">
                {/* <span className="font-semibold text-lg">Level {player.level}</span> */}
                <Text>{player.experience}</Text>
            </div>
        </div>
    );
};

export default PlayerCol;