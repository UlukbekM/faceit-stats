"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { RosterInfo } from "./interfaces";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button";


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

interface HeaderProps {
    player:Player,
}


const eloImageMapping: Record<number, string> = {
    10: "https://support.faceit.com/hc/article_attachments/10525189646876",
    9: "https://support.faceit.com/hc/article_attachments/10525200576028",
    8: "https://support.faceit.com/hc/article_attachments/10525189648796",
    7: "https://support.faceit.com/hc/article_attachments/10525185034012",
    6: "https://support.faceit.com/hc/article_attachments/10525245409692",
    5: "https://support.faceit.com/hc/article_attachments/10525215800860",
    4: "https://support.faceit.com/hc/article_attachments/10525185037724",
    3: "https://support.faceit.com/hc/article_attachments/10525200576796",
    2: "https://support.faceit.com/hc/article_attachments/10525189649308",
    1: "https://support.faceit.com/hc/article_attachments/10525200575516",
};

const imageCheck = (avatar:string) => {
    const img = new Image();
    img.src = avatar;
    return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

export default function Player ({player}:HeaderProps) {
    const router = useRouter()
    const [imgUrl,setImgUrl] = useState<string>(player.avatar)

    useEffect(() => {
        if (player.avatar) {
            imageCheck(player.avatar).then((isValid) => {
                if (!isValid) {
                    setImgUrl("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
                }
            });
        } else {
            setImgUrl("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
        }
    }, [])



    const gotoPlayer = () => {
        router.push(`/players/${player.nickname}`)
    }

    return (
        <div className='rounded-lg border flex p-5 justify-between space-x-2 hover:bg-muted/50 cursor-pointer font-semibold' onClick={gotoPlayer}>
            <div className="flex space-x-2">
                <Avatar className='my-auto'>
                    <AvatarImage src={imgUrl} alt="@shadcn" />
                    <AvatarFallback>{player.nickname[0]}</AvatarFallback>
                </Avatar>
                <div className="my-auto">
                    {player.nickname}
                </div>
            </div>

            <Avatar className='my-auto'>
                <AvatarImage src={eloImageMapping[player.game_skill_level]} alt="@shadcn" />
                <AvatarFallback>{player.game_skill_level}</AvatarFallback>
            </Avatar>
        </div>
    );
}


export function PlayerScoreboard({stats,avatar}:RosterInfo) {
    const router = useRouter()
    const [imgUrl,setImgUrl] = useState<string>(avatar)

    useEffect(() => {
        if (avatar) {
            imageCheck(avatar).then((isValid) => {
                if (!isValid) {
                    setImgUrl("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
                }
            });
        } else {
            setImgUrl("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
        }
    }, [])

    const buttonClick = () => {
        router.push(`/players/${stats.nickname}`)
    }

    return (
        <TableRow>
            <TableCell className="text-left w-48">
                <div className="flex space-x-2 cursor-pointer" onClick={buttonClick}>
                    <Avatar className='my-auto h-5 w-5'>
                        <AvatarImage src={imgUrl} alt="@shadcn"/>
                        <AvatarFallback>{stats.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <div className="my-auto font-semibold">
                        {stats.nickname}
                    </div>
                </div>

                {/* <Popover>
                    <PopoverTrigger className="flex space-x-2">
                        <Avatar className='my-auto h-5 w-5'>
                            <AvatarImage src={imgUrl} alt="@shadcn"/>
                            <AvatarFallback>{stats.nickname[0]}</AvatarFallback>
                        </Avatar>
                        <div className="my-auto font-semibold">
                            {stats.nickname}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="flex space-x-2 justify-between">
                        <Avatar className='my-auto'>
                            <AvatarImage src={imgUrl} alt="@shadcn" />
                            <AvatarFallback>{stats.nickname[0]}</AvatarFallback>
                        </Avatar>
                        <p className="my-auto font-semibold text-ellipsis overflow-hidden">
                            {stats.nickname}
                        </p>
                        <Button onClick={buttonClick}>View Profile</Button>
                    </PopoverContent>
                </Popover> */}
            </TableCell>
            <TableCell className="text-center">{stats.player_stats.Kills}</TableCell>
            <TableCell className="text-center">{stats.player_stats.Deaths}</TableCell>
            <TableCell className="text-center">{stats.player_stats.Assists}</TableCell>
            <TableCell className="text-center">
                {stats.player_stats["K/D Ratio"].length === 1 
                    ? stats.player_stats["K/D Ratio"]+".00"
                    : stats.player_stats["K/D Ratio"].length === 3 
                    ? stats.player_stats["K/D Ratio"]+"0"
                    : stats.player_stats["K/D Ratio"]
                }
            </TableCell>
            <TableCell className="text-center">
                {stats.player_stats["K/R Ratio"].length === 1 
                    ? stats.player_stats["K/R Ratio"]+".00"
                    : stats.player_stats["K/R Ratio"].length === 3 
                    ? stats.player_stats["K/R Ratio"]+"0"
                    : stats.player_stats["K/R Ratio"]
                }    
            </TableCell>
            <TableCell className="text-center">{stats.player_stats.Headshots}</TableCell>
            <TableCell className="text-center">{stats.player_stats["Headshots %"]}</TableCell>
            <TableCell className="text-center">{stats.player_stats.MVPs}</TableCell>
            {/* <TableCell className="text-center">{stats.player_stats["Triple Kills"]}</TableCell> */}
            <TableCell className="text-center">{stats.player_stats["Quadro Kills"]}</TableCell>
            <TableCell className="text-center">{stats.player_stats["Penta Kills"]}</TableCell>
        </TableRow>
    );
}