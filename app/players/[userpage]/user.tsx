"use client"
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Stats from './stats';
import Maps from './maps';
import { HeaderProps } from './interface';
import { usePathname } from 'next/navigation'


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

const eloRanges: [number, number][] = [
    [0,0],
    [100, 500],
    [501, 750],
    [751, 900],
    [901, 1050],
    [1051, 1200],
    [1201, 1350],
    [1351, 1530],
    [1531, 1750],
    [1751, 2000],
    [2001,0],
];

export default function User ({data,stats}:HeaderProps) {
    const pathname = usePathname()
    const username = pathname.slice(9)

    const [elo, setElo] = useState<number>(1)
    const [level, setLevel] = useState<number>(1)
    const [progress, setProgress] = useState<number>(1)
    const [rangeStart,setRangeStart] = useState<number>(0)
    const [rangeEnd,setRangeEnd] = useState<number>(0)
    const [avatar, setAvatar] = useState<string>(data.avatar)

    useEffect(() => {
        if(data.games?.cs2 && data.games.cs2.faceit_elo) {
            let tempElo = data.games.cs2.faceit_elo
            calculateLevel(tempElo)
            setElo(tempElo)
            calculateRangeProgress(tempElo, eloRanges)
        }

        if (data.avatar) {
            imageCheck(data.avatar).then((isValid) => {
                if (!isValid) {
                    setAvatar("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
                }
            });
        } else {
            setAvatar("https://faceitfinder.com/themes/dark/images/faceit_avatar.jpg");
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

    const calculateLevel = (elo:number) => {
        if(elo > 2000) {
            setLevel(10)
            setRangeStart(2001)
            setRangeEnd(0)
        }
        else if(elo > 1750) {
            setLevel(9)
            setRangeStart(eloRanges[9][0])
            setRangeEnd(eloRanges[9][1])
        }
        else if(elo > 1530) {
            setLevel(8)
            setRangeStart(eloRanges[8][0])
            setRangeEnd(eloRanges[8][1])
        }
        else if(elo > 1350) {
            setLevel(7)
            setRangeStart(eloRanges[7][0])
            setRangeEnd(eloRanges[7][1])
        }
        else if(elo > 1200) {
            setLevel(6)
            setRangeStart(eloRanges[6][0])
            setRangeEnd(eloRanges[6][1])
        }
        else if(elo > 1050) {
            setLevel(5)
            setRangeStart(eloRanges[5][0])
            setRangeEnd(eloRanges[5][1])
        }
        else if(elo > 900) {
            setLevel(4)
            setRangeStart(eloRanges[4][0])
            setRangeEnd(eloRanges[4][1])
        }
        else if(elo > 750) {
            setLevel(3)
            setRangeStart(eloRanges[3][0])
            setRangeEnd(eloRanges[3][1])
        }
        else if(elo > 500) {
            setLevel(2)
            setRangeStart(eloRanges[2][0])
            setRangeEnd(eloRanges[2][1])
        }
        else {
            setLevel(1)
            setRangeStart(eloRanges[1][0])
            setRangeEnd(eloRanges[1][1])
        }
    }

    function calculateRangeProgress(number: number, ranges: [number, number][]) {
        if(number > 2000) {
            setProgress(100)
        } else {
            for (const [rangeStart, rangeEnd] of ranges) {
                if (number >= rangeStart && number <= rangeEnd) {
                    let math = (number - rangeStart) / (rangeEnd - rangeStart)
                    setProgress(Math.round(math*100))
                }
            }
        }
    }

    return (
        <div className='flex flex-col md:rounded-lg border-b md:border w-full md:w-5/6 justify-center md:m-5 p-5 space-y-8'>
            <div className='flex flex-col md:flex-row md:justify-between space-y-4'>
                <div className='flex items-center justify-center flex-col md:flex-row'>
                    <Avatar className='h-24 w-24 m-4'>
                        <AvatarImage src={avatar} />
                        <AvatarFallback>{data.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                        {username}
                    </h2>
                </div>
                <div className='flex my-auto'>
                    <div className='m-auto'>
                        <Avatar>
                            <AvatarImage src={eloImageMapping[level]} />
                            <AvatarFallback>1</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='m-auto'>
                        <div className='leading-7 flex space-x-2 mx-4'>
                            <div className='text-lg text-muted-foreground'>
                                ELO
                            </div>
                            <div className="text-lg font-bold">
                                {elo}
                            </div>
                        </div>
                        <div className='flex flex-col justify-center mx-4 w-64'>
                            <div className='w-full my-1'>
                                <Progress value={progress}/>
                            </div>
                            <div className='flex justify-between'>
                                <small className="text-sm font-medium leading-none text-muted-foreground">
                                    {level === 10 ? "2001+" : `${rangeStart}`}
                                </small>
                                <small className="text-sm font-medium leading-none text-muted-foreground">
                                    {level === 10 ? `${rangeStart-(elo+1)}`: ((rangeStart-(elo+1)) + "/+" + ((rangeEnd+1)-elo))}
                                </small>
                                <small className="text-sm font-medium leading-none text-muted-foreground">
                                    {level === 10 ? "∞" : `${rangeEnd}`}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Stats stats={stats}/>
            <Maps stats={stats}/> 
        </div>
    );
}
