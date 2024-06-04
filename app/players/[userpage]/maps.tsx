"use client"
import { useEffect, useState } from 'react';
import { StatsProps } from './interface';

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

interface MapScore {
    map: string;
    count: number;
    score: number;
}

export default function Maps({stats}:StatsProps) {
    const [myArray, setMyArray] = useState<MapScore[]>([]);

    useEffect(() => {
        console.log(stats)
        getMaps()
    }, [])

    const getMaps = () => {
        const mapStats: MapScore[] =  [
            {map:"de_vertigo", count:0,score: 0},
            {map:"de_nuke", count:0,score: 0},
            {map:"de_mirage", count:0,score: 0},
            {map:"de_inferno", count:0,score: 0},
            {map:"de_dust2", count:0,score: 0},
            {map:"de_anubis", count:0,score: 0},
            {map:"de_ancient", count:0,score: 0},
        ];

        stats.items.forEach(item => {
            const existingMap = mapStats.findIndex(stat => stat.map === item.stats.Map);
            if (existingMap !== -1) {
                mapStats[existingMap].count++;
                mapStats[existingMap].score += parseInt(item.stats.Result);
            } else {
                let temp = {map: item.stats.Map, count: 1, score: parseInt(item.stats.Result)}
                mapStats.push(temp);
            }
        });
        setMyArray(mapStats)
    }

    return (
        // <div className="m-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-center grid-flow-row auto-rows-max">
        <div className="m-5 grid justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-4">
            {myArray &&
                myArray.map((item,index) => (
                    <div className='flex flex-col'>
                        {/* <div className='text-center py-1'>{item.map}</div> */}
                        <div className='rounded-sm overflow-hidden'>
                            <img src={`${cs2Maps[item.map]}`} className="w-auto" key={index}/>
                        </div>
                        <div className='flex justify-between font-semibold'>
                            <div className='flex'>
                                <div className='text-muted-foreground'>
                                    Matches:
                                </div>
                                <div className='ml-1'>
                                    {item.count}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='text-muted-foreground'>
                                    Win:
                                </div>
                                <div className='ml-1'>
                                    {item.count > 0 
                                    ? Math.round((item.score/item.count)*100)
                                    : 0
                                    }%
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}