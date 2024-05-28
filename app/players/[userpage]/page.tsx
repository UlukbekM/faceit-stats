import { headers } from 'next/headers'
import User from "./user";
import History from './history';
const apiKey = process.env.NEXT_PUBLIC_FACEIT_SERVER_API_KEY
import Header from '@/app/header';

async function getData(username:String) {
    try {
        const res = await fetch(`https://open.faceit.com/data/v4/players?nickname=${username}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });
    
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
    
        return res.json()
    }  catch (error: any) {
        console.log(error)
    }
}

async function getStats(player_id:String) {
    try {
        const res = await fetch(`https://open.faceit.com/data/v4/players/${player_id}/games/cs2/stats?offset=0&limit=20`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });
    
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
    
        return res.json()
    }  catch (error: any) {
        console.log(error)
    }
}


export default async function Page() {
    const headersList = headers()
    const pathname = headersList.get('x-pathname')
    let username = ""
    let player_id = ""
    if(pathname) {
        username = pathname.slice(9)
    }

    const data = await getData(username);
    if(data && data.player_id) {
        player_id = data.player_id
    }
    console.log(player_id)

    const statsData = await getStats(player_id)

        return (
        <div className="bg-background flex ">
            {data ? 
                <div className='flex flex-col w-full'>
                    <Header/>
                    <div className='flex flex-col items-center'>
                        <User data={data} stats={statsData}/> 
                        <History stats={statsData}/>
                    </div>
                </div>
            : 
                <div className='grid place-items-center h-screen w-full'>
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight my-auto mx-4">
                        Player not found
                    </h2>
                </div>
            }
        </div>
    )
}