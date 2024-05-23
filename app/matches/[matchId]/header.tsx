"use client"
import { useState, useEffect } from 'react';
import { HeaderProps } from './interfaces';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header ({data,stats}:HeaderProps) {
    const [faction1Score, setFaction1Score] = useState<string>("N/A")
    const [faction2Score, setFaction2Score] = useState<string>("N/A")
    const [faction1Img,setFaction1Img] = useState<string>(data.teams.faction1.avatar)
    const [faction2Img,setFaction2Img] = useState<string>(data.teams.faction2.avatar)

    useEffect(() => {
        setScores() 
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

    const setScores = () => {
        for (const item of stats.rounds[0].teams) {
            if (item.team_stats.Team === data.teams.faction1.name) {
                setFaction1Score(item.team_stats['Final Score'])
            } else {
                setFaction2Score(item.team_stats['Final Score'])
            }
        }
    }

    const imageCheck = (avatar:string) => {
        const img = new Image();
        img.src = avatar;
        return new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    }

    return (
        <div className='w-full lg:w-5/6'>
            <div className='flex rounded-lg border justify-center p-5 space-x-4 md:space-x-8'>
                <div className="text-lg font-semibold my-auto hidden md:flex">
                    {data.teams.faction1.name}
                </div>

                <Avatar className='my-auto'>
                    <AvatarImage src={faction1Img} alt="@shadcn" />
                    <AvatarFallback>Team 1</AvatarFallback>
                </Avatar>
                
                <h2 className={`text-3xl font-semibold my-auto ${data.results.winner === "faction1" ? "text-green-500":"text-red-500"}`}>
                    {faction1Score}
                </h2>
                
                <div className='flex flex-col text-center text-muted-foreground'>
                    <div className='text-lg font-semibold'>
                        {stats.rounds[0].game_mode}
                    </div>
                    <div className='text-sm font-medium'>
                        Best of {data.best_of}
                    </div>
                </div>

                <h2 className={`text-3xl font-semibold my-auto ${data.results.winner === "faction2" ? "text-green-500":"text-red-500"}`}>
                    {faction2Score}
                </h2>
                
                <Avatar className='my-auto'>
                    <AvatarImage src={faction2Img} alt="@shadcn" />
                    <AvatarFallback>Team 1</AvatarFallback>
                </Avatar>

                <div className="text-lg font-semibold my-auto hidden md:flex">
                    {data.teams.faction2.name}
                </div>
            </div>
        </div>
    );
}