"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';


export default function Home() {
    const router = useRouter()

    const [input,setInput] = useState<string>("")

    const submitButton = () => {
        router.push(`/players/${input}`)
    }



    return (
        <div className="bg-background min-h-screen flex flex-col items-center justify-center">
            <div className='flex w-full items-center max-w-xl'>
                {/* flex w-full max-w-sm items-center space-x-2 */}
                <form className='flex w-full  items-center space-x-3 rounded-lg border shadow-md p-5'>
                    <Input type="text" placeholder="Enter FACEIT username" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <Button type="submit" onClick={()=> submitButton()}>Search</Button>
                </form>
            </div>
        </div>
    );
}
