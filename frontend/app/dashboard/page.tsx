'use client'

import SiteNav from '@/components/SiteNav';
import React, { useState } from 'react'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { faker } from '@faker-js/faker';
import * as dummy from '@/lib/dummy';
import { TiTick as TickIcon, TiTimes as CrossIcon } from 'react-icons/ti';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai'

export default function Dashboard() {
    const offers = dummy.generateOffers(5);
    return (
        <div>
            <div><SiteNav active='/dashboard' /></div>
            <div className='flex-grow mb-8'><Nav></Nav></div>
            <div className='flex flex-col items-center text-lg font-primary'>
                <div className='md:w-2/3 lg:w-1/2'>
                    <OfferList offers={offers} />
                </div>
            </div>
        </div>
    )
}


export function Nav({ }) {
    const actions = [{ name: 'Offers', href: '/dashboard/offers' }, { name: 'Settings', href: '/dashboard/settings' }]
    return (
        <nav className="flex justify-center py-4 bg-white border-b-[1px] border-neutral-300">
            <div className='md:w-2/3 lg:w-1/2 flex gap-8 justify-between items-center'>
                <div className='flex gap-8'>
                    {
                        actions.map(({ name, }, id) => (
                            <div key={id} className='font-primary text-lg'>
                                {name}
                            </div>
                        ))
                    }
                </div>
                <div className='w-full flex justify-end'>
                    <Search />
                </div>
            </div>
        </nav>
    )
}

export function Profile({ }) {
    return (
        <div>
            Hello
        </div>
    )
}

export function JobExperience({ }) {
}

export function OfferList({ offers }: { offers: Array<any> }) {
    return (
        <div className='flex flex-col gap-4'>
            {
                offers.map((offer, id) => (
                    <div key={id} className=''>
                        <Offer offer={offer} />
                    </div>
                ))
            }
        </div>
    )
}

export function Offer({ offer }: { offer: any }) {
    return (
        <div className='p-8 flex flex-col gap-8 border-solid border-neutral-200 border-[1px] rounded-lg bg-white'>
            <div className='flex gap-8'>
                <div className='flex-shrink-0'>
                    {
                        offer.from.logo ? <div>
                            <img className="w-14 h-14 rounded border-[1px] border-neutral-300" src={offer.from.logo}></img>
                        </div> :
                            <div className='w-14 h-14 rounded border-[1px] border-neutral-400 bg-neutral-200'></div>
                    }
                </div>
                <div>
                    <div className='font-primary text-2xl'>{offer.title}</div>
                    <div className='text-base'>{offer.from.name}</div>
                </div>
            </div>
            <div className='font-primary text-base text-neutral-600 font-light'>{offer.description}</div>
            {/* <div>{offer}</div> */}
            <div className='flex gap-4'>
                <button className='pos-btn flex items-center gap-2'><TickIcon size={24}/> Accept</button>
                <button className='neg-btn flex items-center gap-2'>
                    <CrossIcon size={24} className='text-neutral-500'/>
                    Decline
                </button>
            </div>
        </div>
    );
}

export function Search() {
    const [txt, setText] = useState('');

    return (
        <div className='w-full flex justify-end'>
            <div className='border-neutral-300 border-[1px] font-primary rounded text-neutral-500 w-[70%] overflow-hidden flex'>
                <input type='text' onChange={e => setText(e.currentTarget.value)}
                    className='px-4 py-2 text-lg bg-neutral-100 flex-auto'
                    placeholder='Search'
                />
                <div className='h-full border-l-[1px] border-neutral-300 flex items-center px-3'>
                    <SearchIcon size={24}/>
                </div>
            </div>
        </div>
    )
}