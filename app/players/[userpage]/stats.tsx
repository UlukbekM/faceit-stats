"use client"
import { useState, useEffect } from 'react';
import { StatsProps } from './interface';



export default function Stats({stats}:StatsProps) {
    const [avgKills,setAvgKills] = useState<number>(0)
    const [avgWin,setAvgWin] = useState<number>(0)
    const [avgHS,setAvgHS] = useState<number>(0)
    const [avgKD,setAvgKD] = useState<number>(0)
    const [avgKR,setAvgKR] = useState<number>(0)

    useEffect(() => {
        // console.log(stats)
        calculateAverageKills()
    }, [])

    const calculateAverageKills = () => {
        let itemCount = stats.items.length
        if (itemCount === 0) {
            return
        }

        let totalKills = 0
        let totalHS = 0
        let totalWin = 0
        let totalKD = 0
        let totalKR = 0

        for (const item of stats.items) {
            totalKills += parseInt(item.stats.Kills);
            totalHS += parseInt(item.stats['Headshots %'])
            totalWin += parseInt(item.stats.Result)
            totalKD += parseFloat(item.stats['K/D Ratio'])
            totalKR += parseFloat(item.stats['K/R Ratio'])
        }
    
        setAvgKD(parseFloat((totalKD/itemCount).toFixed(2)))
        setAvgKR(parseFloat((totalKR/itemCount).toFixed(2)))
        setAvgWin(Math.round((totalWin/itemCount)*100))
        setAvgHS(Math.round(totalHS / itemCount))
        setAvgKills(Math.round(totalKills / itemCount))
    }

    return (
        <div className="flex flex-col m-5 space-y-6 justify-center">
            <div className="text-lg font-semibold text-center">
                Last 20 Matches Statistics
            </div>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
                <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col justify-center">
                    <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                        Win rate
                    </div>
                    <div className='p-6 pt-0 text-2xl font-bold'>
                        {avgWin}%
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col justify-center">
                    <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                        Average Kills
                    </div>
                    <div className='p-6 pt-0 text-2xl font-bold'>
                        {avgKills}
                    </div>
                </div>
                
                <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col justify-center">
                    <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                        Average Headshots
                    </div>
                    <div className='p-6 pt-0 text-2xl font-bold'>
                        {avgHS}%
                    </div>
                </div>
                
                <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col justify-center">
                    <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                        Average K/D
                    </div>
                    <div className='p-6 pt-0 text-2xl font-bold'>
                        {avgKD}
                    </div>
                </div>
                
                <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col justify-center col-span-2 lg:col-span-1">
                    <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                        Average K/R
                    </div>
                    <div className='p-6 pt-0 text-2xl font-bold'>
                        {avgKR}
                    </div>
                </div>
            </div>
        </div>
    );
}