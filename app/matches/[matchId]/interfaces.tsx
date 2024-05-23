export interface PlayerStats {
    Kills: string;
    Assists: string;
    Deaths: string;
    MVPs: string;
    "K/D Ratio": string;
    "K/R Ratio": string;
    "Headshots %": string;
    "Quadro Kills": string;
    "Triple Kills": string;
    "Penta Kills": string;
    Result: string;
    Headshots: string;
  }
  
  interface Player {
    player_id: string;
    nickname: string;
    player_stats: PlayerStats;
  }
  
  interface TeamStats {
    "First Half Score": string;
    "Second Half Score": string;
    "Team Win": string;
    "Final Score": string;
    "Overtime score": string;
    Team: string;
    "Team Headshots": string;
  }
  
  interface Team {
    team_id: string;
    premade: boolean;
    team_stats: TeamStats;
    players: Player[];
  }
  
  interface RoundStats {
    Winner: string;
    Map: string;
    Score: string;
    Region: string;
    Rounds: string;
  }
  
  interface Round {
    best_of: string;
    competition_id: string | null;
    game_id: string;
    game_mode: string;
    match_id: string;
    match_round: string;
    played: string;
    round_stats: RoundStats;
    teams: Team[];
  }


  interface Player {
    player_id: string;
    nickname: string;
    avatar: string;
    membership: string;
    game_player_id: string;
    game_player_name: string;
    game_skill_level: number;
    anticheat_required: boolean;
}

interface Stats {
    winProbability: number;
    skillLevel: {
        average: number;
        range: {
            min: number;
            max: number;
        };
    };
    rating: number;
}

interface Team {
    faction_id: string;
    leader: string;
    avatar: string;
    roster: Player[];
    stats: Stats;
    substituted: boolean;
    name: string;
    type: string;
}

interface Entity {
    class_name: string;
    game_location_id: string;
    guid: string;
    image_lg: string;
    image_sm: string;
    name: string;
}

interface Voting {
    voted_entity_types: string[];
    location: {
        entities: Entity[];
        pick: string[];
    };
    map: {
        entities: Entity[];
        pick: string[];
    };
}

interface Results {
    winner: string;
    score: {
        [key: string]: number;
    };
}

interface DetailedResult {
    asc_score: boolean;
    winner: string;
    factions: {
        [key: string]: {
            score: number;
        };
    };
}

interface MatchData {
    match_id: string;
    version: number;
    game: string;
    region: string;
    competition_id: string;
    competition_type: string;
    competition_name: string;
    organizer_id: string;
    teams: {
        faction1: Team;
        faction2: Team;
    };
    voting: Voting;
    calculate_elo: boolean;
    configured_at: number;
    started_at: number;
    finished_at: number;
    demo_url: string[];
    chat_room_id: string;
    best_of: number;
    results: Results;
    detailed_results: DetailedResult[];
    status: string;
    faceit_url: string;
}

interface Stats {
    rounds: Round[];
}

export interface HeaderProps {
    stats: Stats
    data: MatchData;
}

// export interface PlayerStatistics {
//     stats: Player
// }

export interface RosterInfo {
    stats: PlayerScoreboardStats;
    avatar:string
}

export interface ScoreboardInterface {
    stats: Player[]
}

export interface PlayerScoreboardStats {
    player_id: string;
    nickname: string;
    player_stats: PlayerStats;
}