'use client'

import React from "react";
import {axios} from '@/api/utils';
import { useRouter } from "next/navigation";

export default function ProfileCard(
    { data } : { data: any }
): React.ReactNode {
    const router = useRouter();
    console.log("User or recruiter data: ", data)
    const onClick = async () => {
        console.log('signing out');
        await axios.get('/api/signout');
        router.push('/login');
    };
    return (
        <div className="border-2 border-neutral-200 rounded-full group relative">
            <img 
                src={data.avatar || '/images/user.jpg'}
                className="rounded-full w-14 h-14 border-[1px] border-neutral-700"
            ></img>
            <div className="font-primary w-max  p-4 rounded border-[1px] bg-neutral-200 border-neutral-300 absolute top-full right-[60%] opacity-0 group-hover:opacity-100">
                <div>
                    <button className="cursor-pointer text-neutral-600 hover:text-blue-500" onClick={onClick}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}