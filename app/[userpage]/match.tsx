"use client"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { useState, useEffect } from "react";

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

interface MatchProps {
    data: Stats;
}

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

const cs2Maps: Record<string, string> = {
    "de_vertigo": "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3bf25224-baee-44c2-bcd4-f1f72d0bbc76_1695819180008.jpeg",
    "de_nuke": "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
    "de_mirage": "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
    "de_inferno": "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
    "de_dust2": "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
    "de_anubis": "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
    "de_ancient": "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
    "de_overpass": "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/058c4eb3-dac4-441c-a810-70afa0f3022c_1695819170133.jpeg",
};

export default function Match({data}:MatchProps) {
    const [matchDate, setMatchDate] = useState<string>("")
    const [map,setMap] = useState<string>("")
    useEffect(() => {
        console.log(data)
        formatDate()
        let tempMap = data.Map.slice(3)
        let newMap = tempMap.charAt(0).toUpperCase() + tempMap.slice(1)
        setMap(newMap)
    }, [])

    const formatDate = () => {
        let matchDate = new Date(data["Created At"])
        let date = matchDate.getDate()
        let month = matchDate.getMonth()
        let hours:string = String(matchDate.getHours())
        if(hours === "0"){
            hours = "00"
        } 
        let minutes = matchDate.getMinutes()

        setMatchDate(date+" "+months[month]+" - "+hours+":"+minutes)
    }

    return (
        <TableRow className="">
            <TableCell className="text-center ">
                {matchDate}
            </TableCell>

            <TableCell className={`${data.Result === "1" ? 
            "text-green-500" :  "text-red-500"} text-center`}>
                {data.Result === "1" ? "Win" : "Loss"}
            </TableCell>

            <TableCell className="text-center whitespace-nowrap">
                {data.Score}
            </TableCell>

            <TableCell className="flex flex-col md:flex-row items-center justify-center">
                <div className="mb-2 md:mb-0 md:mr-2">
                    {map}
                </div>
                <img src={`${cs2Maps[data.Map]}`} className="max-w-24 rounded-sm"/>
            </TableCell>

            <TableCell className={`text-center ${parseInt(data.Kills) > parseInt(data.Deaths) ? "text-green-500" : "text-red-500"}`}>
                {data.Kills}/{data.Assists}/{data.Deaths}
            </TableCell>

            <TableCell className="text-center">
                {data["Headshots %"]}%
            </TableCell>

            <TableCell className="text-center">
                {data["K/D Ratio"] === "1" ? "1.00":data["K/D Ratio"]}
            </TableCell>
        </TableRow>
    );
}