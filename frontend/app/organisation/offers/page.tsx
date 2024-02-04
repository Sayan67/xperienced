'use client'
import OrgSiteNav from "@/components/OrgSiteNav";
import OrgSubNav from "@/components/OrgSubNav";
import { TiTick as TickIcon, TiTimes as CrossIcon, TiPlus } from 'react-icons/ti';
import { useEffect, useState } from "react";
import { axios } from '@/api/utils'
import * as dummy from '@/lib/dummy';
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "@/components/TextField";
import { TfiClose } from 'react-icons/tfi';

export default function OthersPage() {
    const [offers, setOffers] = useState<Array<any>>([]);
    const [createOfferOpen, setCreateOfferOpen] = useState(false);

    useEffect(() => {
        setOffers([...offers, ...dummy.generateOffers(5)]);
    }, [])

    return (
        <div>
            <div className='flex-grow mb-8'>
                <OrgSubNav url='/organisation/offers'>
                    <button className="flex items-center gap-2 font-primary bg-blue-500 text-white p-2 px-4 rounded" onClick={_ => setCreateOfferOpen(true)}>
                        <TiPlus />
                        New Offer
                    </button>
                </OrgSubNav>
            </div>
            <div className='flex flex-col items-center text-lg font-primary'>
                <div className='md:w-2/3 lg:w-1/2 flex flex-col gap-8'>
                    {
                    createOfferOpen &&
                    <div>
                        <CreateOfferForm onQuit={() => setCreateOfferOpen(false)} />
                    </div>
                    }

                    {
                        offers.map((offer, id) => {
                            return (<div key={id}><Offer offer={offer} /></div>)
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export function Offer({ offer }: { offer: any }) {
    console.log(offer)
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
                <button className='pos-btn flex items-center gap-2'><TickIcon size={24} /> Accept</button>
                <button className='neg-btn flex items-center gap-2'>
                    <CrossIcon size={24} className='text-neutral-500' />
                    Decline
                </button>
            </div>
        </div>
    );
}

type Inputs = {
    to: string,
    title: string,
    description: string,
    is_remote: boolean,
    location: string,
    schedule: {
        start: string,
        end: string,
        is_negotiable: boolean,
        duration: number,
        days_per_week: number
    }
};

function CreateOfferForm({onQuit} : {onQuit: Function}) {
    const { register, handleSubmit, watch, formState } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        return await axios.post('/api/organisation/offer', {...data});
    };

    return (
        <div className="bg-white rounded border-neutral-300 border-[1px] overflow-hidden">
            <div className="p-4 flex justify-between border-b-[1px] bg-neutral-50 border-neutral-300">
                <div className="font-bold text-neutral-500">New Offer</div>
                <TfiClose size={32} className="text-neutral-800 rounded p-2 hover:bg-neutral-300 border-[1px] hover:border-neutral-400 border-transparent transition-all cursor-pointer" onClick={_ => onQuit()}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4"
            >
                <input type="text" placeholder="Job Title" className='txt-field' {...register("title", { required: true })} />
                <textarea placeholder="Job Description" className='txt-field resize-none h-32' {...register('description', { required: true })} />
                <label>
                    <input type="checkbox" {...register('is_remote')} className="mr-4" />
                    Is this a remote job ?
                </label>
                <div className="flex gap-4">
                    <input type="text" placeholder="Start Time" className="txt-field" {...register('schedule.start', { required: true })} />
                    <input type="text" placeholder="End Time" className="txt-field" {...register('schedule.end', { required: true })} />
                </div>
                <div className="flex gap-4">
                    <input type="text" placeholder="Duration in hours" className='txt-field' {...register('schedule.duration', { required: true })} />
                    <input type="text" placeholder="Working days per week" className='txt-field' {...register('schedule.days_per_week', { required: true })} />
                </div>
                <label>
                    <input type="checkbox" className="mr-4" {...register('schedule.days_per_week', { required: true })} />
                    Is this schedule negotiable ?
                </label>
                <input type="submit" className="pos-btn" value='Create' />
            </form>
        </div>
    )
}

function PersonSearchList() {

}