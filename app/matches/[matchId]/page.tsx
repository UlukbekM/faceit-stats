import { headers } from 'next/headers'
import Overview from './overview';
import Scoreboard from './scoreboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Score from './score';
const apiKey = process.env.NEXT_PUBLIC_FACEIT_SERVER_API_KEY
import Header from '@/app/header';

async function getMatchData(matchId:String) {
    try {
        const res = await fetch(`https://open.faceit.com/data/v4/matches/${matchId}`, {
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

async function getMatchStats(matchId:String) {
    try {
        const res = await fetch(`https://open.faceit.com/data/v4/matches/${matchId}/stats`, {
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
    let matchId = ""
    if(pathname) {
        matchId = pathname.slice(9)
    }

    const matchOverview = await getMatchData(matchId);
    const matchStats = await getMatchStats(matchId)
    // console.log(matchStats)

        return (
        <div className="bg-background">
            {matchOverview ? 
            <div>
                <Header/>
                <div className='flex flex-col w-full items-center'>
                    <Tabs defaultValue="overview" className="flex flex-col items-center w-full">
                        <TabsList className='mb-4'>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="scoreboard">Scoreboard</TabsTrigger>
                        </TabsList>

                        <Score data={matchOverview} stats={matchStats}/>

                        <TabsContent value="overview" className='w-full lg:w-5/6'>
                            <Overview data={matchOverview} stats={matchStats}/>
                        </TabsContent>
                        <TabsContent value="scoreboard" className='w-full lg:w-5/6'>
                            <Scoreboard data={matchOverview} stats={matchStats}/>
                        </TabsContent>
                    </Tabs>
                </div>            
            </div>
            :
            <div className='grid place-items-center h-screen w-full'>
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight my-auto mx-4">
                    Match not found
                </h2>
            </div>
            }
        </div>
    )
}