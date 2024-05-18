import { useState } from 'react';
// import { useJwt } from "react-jwt";
import AuthToken from '../constants/AuthToken';
import { IUser } from '../interfaces/user';

export default function useAuth(): [IUser | null] {
    const [value] = useState(() => {
        const jsonValue = localStorage.getItem(AuthToken);

        if (jsonValue != null) {
            // const { decodedToken, isExpired } = useJwt(jsonValue);
            // if (!isExpired) {
            // 	return decodedToken as IUser;
            // }
        }

        return null;
    });

    return [value];
}
