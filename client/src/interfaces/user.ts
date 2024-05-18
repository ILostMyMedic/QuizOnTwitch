export interface ILevel {
    /** NOT PART OF MVP */
}

export interface IBadges {
    /** NOT PART OF MVP */
}

export interface IUser {
    id: string;
    username: string;
    avatar: string;
    created_at: string;
    level: ILevel;
    badges: IBadges;
}
