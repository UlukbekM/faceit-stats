import Match from "./match";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { StatsProps } from "./interface";

export default function History({stats}:StatsProps) {
    return (
        <div className="flex flex-col m-5 space-y-6 justify-center rounded-lg border w-full md:w-5/6">
            {/* <div className="mx-5 my-3 text-2xl font-semibold text-center">Match History</div> */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Result</TableHead>
                        <TableHead className="text-center">Score</TableHead>
                        <TableHead className="text-center">Map</TableHead>
                        <TableHead className="text-center">K/D/A</TableHead>
                        <TableHead className="text-center">Headshots</TableHead>
                        <TableHead className="text-center">K/D</TableHead>
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