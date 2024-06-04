interface Stats {
    Team: string;
    'K/D Ratio': string;
    'K/R Ratio': string;
    'Best Of': string;
    Rounds: string;
    Game: string;
    'Second Half Score': string;
    Headshots: string;
    Kills: string;
    Assists: string;
    'Competition Id': string;
    'Triple Kills': string;
    Winner: string;
    'Player Id': string;
    'First Half Score': string;
    Map: string;
    Deaths: string;
    'Headshots %': string;
    'Overtime score': string;
    'Quadro Kills': string;
    'Penta Kills': string;
    'Game Mode': string;
    Score: string;
    'Match Round': string;
    MVPs: string;
    'Match Id': string;
    'Created At': string;
    Nickname: string;
    Result: string;
    'Final Score': string;
    Region: string;
    'Updated At': string;
}

interface Item {
    stats: Stats;
}

interface Data {
    items: Item[];
}

interface UserInfo {
    avatar: string,
    nickname: string,
    games?: {
        cs2?: {
            faceit_elo?: number;
        };
    },
    player_id: string
}

export interface HeaderProps {
    data: UserInfo;
    stats: Data;
}

export interface StatsProps {
    stats: Data;
}

export interface DataProps {
    data: Stats;
}