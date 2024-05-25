import SearchHome from './searchHome';
import Ulu from './ulu';


export default function Home() {
    return (
        <div className="bg-background min-h-screen grid place-items-center">
            <div className='space-y-4 p-4 md:w-1/2 lg:w-1/3 text-center w-full'>
                <div className="text-5xl font-extrabold flex space-x-2 justify-center">
                    <Ulu/>
                    <div className='text-primary'>FACEIT stats</div>
                </div>
                <SearchHome/>
            </div>
        </div>
    );
}
