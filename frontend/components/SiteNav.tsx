'use client'

import { useUser } from "@/api/auth"
import { useContext } from "react"
import { Icons } from "./icons";
import ProfileCard from "./ProfileCard";

export default function SiteNav({ active, actions }: { active: string, actions: Array<{ name: string, href: string }> }) {
    const { error, isLoading, data } = useUser();

    return (
        <nav className='flex items-center justify-between py-4 bg-white border-b-[1px] border-neutral-300 px-12'>
            <div className='font-tertiary font-bold text-2xl flex items-center'>
                <span className='text-blue-500 text-4xl mr-[0.15em]'>X</span>
                perienced
            </div>
            <div className='flex items-center gap-12 font-semibold'>
                <div className='flex gap-8'>
                    {
                        actions.map(({ name, href }, id) => (
                            <div key={id}>
                                {
                                    active !== href ?
                                        <a href={href} key={id}
                                            className='tracking-wide font-primary text-lg text-neutral-700 font-semibold'
                                        >
                                            {name}
                                        </a>
                                        :
                                        <a href={href} key={id} className='text-lg tracking-wide font-primary text-neutral-700 font-semibold border-b-[4px] border-b-blue-500 py-1'>
                                            {name}
                                        </a>
                                }
                            </div>
                        ))
                    }
                </div>
                {
                    isLoading ? 
                    <Icons.spinner />
                    :
                    <ProfileSection user={data} />
                }
            </div>
        </nav>
    )
}

function ProfileSection({ user } : { user: any }) {
    return (
        user ?
        <ProfileCard data={user} />
        :
        <div className='flex gap-4 text-lg font-secondary'>
            <button className='border-[1px] border-neutral-300 px-4 py-2 rounded tracking-wider text-neutral-600 text-base'>Log In</button>
            <button className='bg-blue-500  px-4 py-2 rounded text-white tracking-wider'>Join</button>
        </div>
    );
}