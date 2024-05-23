"use client"
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Player from './player';
import { HeaderProps } from './interfaces';

export default function Overview ({data,stats}:HeaderProps) {
    const [serverURL, setServerURL] = useState<string>("")
    const [mapURL, setMapURL] = useState<string>("")
    const [map, setMap] = useState<string>("")

    useEffect(() => {
        setImages()  
        let tempMap = data.voting.map.pick[0].slice(3)
        let newMap = tempMap.charAt(0).toUpperCase() + tempMap.slice(1)
        setMap(newMap)
    }, [])

    const setImages = () => {
        let serverTarget = data.voting.location.pick[0]
        let mapTarget = data.voting.map.pick[0]

        for (const item of data.voting.location.entities) {
            if (item.name === serverTarget) {
                setServerURL(item.image_lg)
            }
        }

        for (const item of data.voting.map.entities) {
            if (item.class_name === mapTarget) {
                setMapURL(item.image_lg)
            }
        }
    }

    return (
        <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='space-y-4 basis-1/3'>
                <div className='flex space-x-2 m-2 justify-center md:hidden md:m-0'>
                    <Avatar className='my-auto'>
                        <AvatarImage src={data.teams.faction1.avatar} alt="@shadcn"/>
                        <AvatarFallback>{data.teams.faction1.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='my-auto'>
                        {data.teams.faction1.name}
                    </div>
                </div>
                {data.teams.faction1.roster.map((item) => (
                    <Player player={item} key={item.player_id}/>
                ))}
            </div>

            <div className='rounded-lg border font-medium order-first md:order-none mb-4  p-2 lg:p-4 h-full basis-1/3 lg:m-4'>
                <div className='flex flex-col m-2'>
                    <div> 
                        Server
                    </div>
                    <div className='flex space-x-2 bg-muted p-2 rounded-lg'>
                        <div>
                            <img src={serverURL} alt={data.voting.location.pick[0]} className="max-w-24 rounded-sm"/>
                        </div>
                        <div className='my-auto'>
                            {data.voting.location.pick}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col m-2'>
                    <div>
                        Map
                    </div>
                    <div className='flex space-x-2 bg-muted p-2 rounded-lg'>
                        <div>
                            <img src={mapURL} alt={map} className="max-w-24 rounded-sm"/>
                        </div>
                        <div className='my-auto'>
                            {map}
                        </div>
                    </div>
                </div>
            </div>

            <div className='space-y-4 basis-1/3 my-4 md:my-0'>
                <div className='flex space-x-2 m-2 justify-center md:hidden md:m-0'>
                    <Avatar className='my-auto'>
                        <AvatarImage src={data.teams.faction2.avatar} alt="@shadcn"/>
                        <AvatarFallback>{data.teams.faction2.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='my-auto'>
                        {data.teams.faction2.name}
                    </div>
                </div>
                {data.teams.faction2.roster.map((item) => (
                    <Player player={item} key={item.player_id}/>
                ))}
            </div>
        </div>
    );
}
