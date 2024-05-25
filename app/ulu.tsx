"use client"
import { useRouter } from 'next/navigation';

export default function Ulu () {
    const router = useRouter()

    const submitButton = () => {
        router.push(`/players/Loreo`)
    }
    
    return(
        <div className='cursor-pointer text-primary transition-colors hover:text-foreground' onClick={submitButton}>
            ulu's
        </div>
    )
}