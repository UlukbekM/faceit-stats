"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Header () {
    const router = useRouter()
    const [input,setInput] = useState<string>("")

    const goToPlayer = () => {
        router.push(`/players/${input}`)
    }

    const goHome = () => {
        router.push(`/`)
    }

    return(
        <div className='flex justify-center mb-5'>
            <div className="flex justify-between p-4 border-b border-r border-l w-5/6 rounded-b-lg">
                <div className='my-auto transition-colors hover:text-primary cursor-pointer text-2xl font-bold' onClick={goHome}>
                    ulu's FACEIT stats
                </div>

                <form className='flex w-full max-w-sm items-center space-x-2 my-auto' onSubmit={goToPlayer}>
                    <Input type="text" placeholder="Enter FACEIT username" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <Button type="submit" value="submit">Search</Button>
                </form>
            </div>
        </div>
    )
}