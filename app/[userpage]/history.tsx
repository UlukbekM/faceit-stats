import Match from "./match";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface HeaderProps {
    stats: Data;
}

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

export default function History({stats}:HeaderProps) {
    return (
        <div className="flex flex-col m-5 space-y-6 justify-center rounded-lg border w-full md:w-3/4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Result</TableHead>
                        <TableHead className="text-center">Score</TableHead>
                        <TableHead className="text-center">Map</TableHead>
                        <TableHead className="text-center">K/A/D</TableHead>
                        <TableHead className="text-center">Headshots</TableHead>
                        <TableHead className="text-center">Rating</TableHead>
                        {/* <TableHead className="text-right">ELO</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stats.items.map((item) => (
                        <Match data={item.stats} key={item.stats["Match Id"]}/>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
}