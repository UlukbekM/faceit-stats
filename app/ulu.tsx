"use client"
import { useRouter } from 'next/navigation';

export default function Ulu () {
    const router = useRouter()

    const submitButton = () => {
        router.push(`/players/Loreo`)
    }
    
    return(
        <div className='cursor-pointer transition-colors text-primary hover:text-faceit' onClick={submitButton}>
            ulu's
        </div>
    )
}