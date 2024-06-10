"use client"
import { useState, useEffect } from 'react';
import { HeaderProps, PlayerScoreboardStats, PlayerStats } from './interfaces';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlayerScoreboard } from './player';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArrowUpDown, MoveDown, MoveUp} from "lucide-react"
import { Button } from '@/components/ui/button';

type SortingState = [string, string];


export default function Scoreboard ({data,stats}:HeaderProps) {
    const [faction1Img,setFaction1Img] = useState<string>(data.teams.faction1.avatar)
    const [faction2Img,setFaction2Img] = useState<string>(data.teams.faction2.avatar)

    const [team1Stats, setTeam1Stats] = useState<PlayerScoreboardStats[]>(stats.rounds[0].teams[0].players)
    const [team2Stats, setTeam2Stats] = useState<PlayerScoreboardStats[]>(stats.rounds[0].teams[1].players)

    const [sorting1,setSorting1] = useState<SortingState>(["Kills","dsc"])
    const [sorting2,setSorting2] = useState<SortingState>(["Kills","dsc"])

    useEffect(() => {
        sortTableHeader(1,"Kills")
        sortTableHeader(2,"Kills")
        // console.log(stats)

        if (data.teams.faction1.avatar) {
            imageCheck(data.teams.faction1.avatar).then((isValid) => {
                if (!isValid) {
                    setFaction1Img("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
                }
            });
        } else {
            setFaction1Img("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
        }

        if (data.teams.faction2.avatar) {
            imageCheck(data.teams.faction2.avatar).then((isValid) => {
                if (!isValid) {
                    setFaction2Img("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
                }
            });
        } else {
            setFaction2Img("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
        }
    }, [])

    const imageCheck = (avatar:string) => {
        const img = new Image();
        img.src = avatar;
        return new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    }

    const sortTableHeader = (team:number,column: keyof PlayerStats) => {
        if(team === 1) {
            if (sorting1[0] === column) {
                if(sorting1[1] === "dsc") {
                    const team1 = [...team1Stats].sort((a, b) => {
                        return parseFloat(b.player_stats[column]) - parseFloat(a.player_stats[column]);
                    });
                    setTeam1Stats(team1);
                    setSorting1([sorting1[0],"asc"])
                } else {
                    const team1 = [...team1Stats].sort((a, b) => {
                        return parseFloat(b.player_stats[column]) + parseFloat(a.player_stats[column]);
                    });
                    setTeam1Stats(team1);
                    setSorting1([sorting1[0],"dsc"])
                }
            } else {
                const team1 = [...team1Stats].sort((a, b) => {
                    return parseFloat(b.player_stats[column]) - parseFloat(a.player_stats[column]);
                });
                setTeam1Stats(team1);
                setSorting1([column, "asc"]);
            }
        } else {
            if (sorting2[0] === column) {
                if(sorting2[1] === "dsc") {
                    const team2 = [...team2Stats].sort((a, b) => {
                        return parseFloat(b.player_stats[column]) - parseFloat(a.player_stats[column]);
                    });
                    setTeam2Stats(team2);
                    setSorting2([sorting2[0],"asc"])
                } else {
                    const team2 = [...team2Stats].sort((a, b) => {
                        return parseFloat(b.player_stats[column]) + parseFloat(a.player_stats[column]);
                    });
                    setTeam2Stats(team2);
                    setSorting2([sorting2[0],"dsc"])
                }
            } else {
                const team2 = [...team2Stats].sort((a, b) => {
                    return parseFloat(b.player_stats[column]) - parseFloat(a.player_stats[column]);
                });
                setTeam2Stats(team2);
                setSorting2([column, "asc"]);
            }
        }

    }

    return (
        <div className='flex flex-col'>
            <div className='rounded-lg border m-2'>
                <div className='flex space-x-4 my-2 mx-4'>
                    <Avatar className='my-auto h-8 w-8'>
                        <AvatarImage src={faction1Img} alt="@shadcn" />
                        <AvatarFallback>{data.teams.faction1.leader[0]}</AvatarFallback>
                    </Avatar>
                    <div className='text-lg font-semibold my-auto'>
                        {data.teams.faction1.name}
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-left w-48'>Player</TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Kills")}
                                >
                                Kills
                                {sorting1[0] === "Kills" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }

                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Deaths")}
                                >
                                Deaths
                                {sorting1[0] === "Deaths" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Assists")}
                                >
                                Assists
                                {sorting1[0] === "Assists" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"K/D Ratio")}
                                >
                                K/D Ratio
                                {sorting1[0] === "K/D Ratio" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"K/R Ratio")}
                                >
                                K/R Ratio
                                {sorting1[0] === "K/R Ratio" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Headshots")}
                                >
                                Headshots
                                {sorting1[0] === "Headshots" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Headshots %")}
                                >
                                Headshots %
                                {sorting1[0] === "Headshots %" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"MVPs")}
                                >
                                MVPs
                                {sorting1[0] === "MVPs" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            {/* <TableHead className='text-center'>
                                <Button
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Triple Kills")}
                                >
                                Triple Kills
                                {sorting[0] === "Triple Kills" ?
                                    sorting[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead> */}
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Quadro Kills")}
                                >
                                Quadro Kills
                                {sorting1[0] === "Quadro Kills" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Penta Kills")}
                                >
                                Penta Kills
                                {sorting1[0] === "Penta Kills" ?
                                    sorting1[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {team1Stats.map((player) => {
                            const playerStats = data.teams.faction1.roster.find((statsPlayer) => statsPlayer.nickname === player.nickname);
                            
                            if (playerStats) {
                                return (
                                    <PlayerScoreboard
                                        stats={player}
                                        avatar={playerStats.avatar}
                                        key={player.player_id}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </TableBody>
                </Table>
            </div>
            <div className='rounded-lg border m-2'>
                <div className='flex space-x-4 my-2 mx-4'>
                    <Avatar className='my-auto h-8 w-8'>
                        <AvatarImage src={faction2Img} alt="@shadcn" />
                        <AvatarFallback>{data.teams.faction2.leader[0]}</AvatarFallback>
                    </Avatar>
                    <div className='text-lg font-semibold my-auto'>
                        {data.teams.faction2.name}
                    </div>
                </div>
                <Table>
                <TableHeader>
                        <TableRow>
                            <TableHead className='text-left w-48'>Player</TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"Kills")}
                                >
                                Kills
                                {sorting2[0] === "Kills" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"Deaths")}
                                >
                                Deaths
                                {sorting2[0] === "Deaths" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"Assists")}
                                >
                                Assists
                                {sorting2[0] === "Assists" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"K/D Ratio")}
                                >
                                K/D Ratio
                                {sorting2[0] === "K/D Ratio" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"K/R Ratio")}
                                >
                                K/R Ratio
                                {sorting2[0] === "K/R Ratio" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"Headshots")}
                                >
                                Headshots
                                {sorting2[0] === "Headshots" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"Headshots %")}
                                >
                                Headshots %
                                {sorting2[0] === "Headshots %" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"MVPs")}
                                >
                                MVPs
                                {sorting2[0] === "MVPs" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            {/* <TableHead className='text-center'>
                                <Button
                                variant="ghost"
                                onClick={() => sortTableHeader(1,"Triple Kills")}
                                >
                                Triple Kills
                                {sorting[0] === "Triple Kills" ?
                                    sorting[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead> */}
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"Quadro Kills")}
                                >
                                Quadro Kills
                                {sorting2[0] === "Quadro Kills" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                            <TableHead className='text-center'>
                                <Button
                                size={"sm"}
                                variant="ghost"
                                onClick={() => sortTableHeader(2,"Penta Kills")}
                                >
                                Penta Kills
                                {sorting2[0] === "Penta Kills" ?
                                    sorting2[1] === "asc" ? <MoveDown className="ml-2 h-4 w-4"  /> : <MoveUp className="ml-2 h-4 w-4"  /> 
                                    :
                                    <ArrowUpDown className="ml-2 h-4 w-4 opacity-0" />
                                }
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {team2Stats.map((player) => {
                            const playerStats = data.teams.faction2.roster.find((statsPlayer) => statsPlayer.nickname === player.nickname);
                            
                            if (playerStats) {
                                return (
                                    <PlayerScoreboard
                                        stats={player}
                                        avatar={playerStats.avatar}
                                        key={player.player_id}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}