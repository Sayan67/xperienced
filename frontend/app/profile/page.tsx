'use client'
import { UserContext } from "@/api/auth";
import Loading from "@/components/Loading";
import SiteNav from "@/components/SiteNav";
import SubNav from "@/components/SubNav";
import TextField from "@/components/TextField";
import { axios } from "@/api/utils";
import { useContext, useState } from "react";
import { TiPlus } from 'react-icons/ti';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const subNavActions = [
    { name: 'Offers', href: '/dashboard' }, { name: 'Profile', href: '/profile' }
];
const siteNavActions = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
];

export default function ProfilePage() {
    const { toast } = useToast();
    const [profileData, setProfileData] = useState({
        name: '', location: '', bio: '',
    });
    const [isProfileEditSubmitting, setProfileEditSubmitting] = useState(false);
    const { error: userError, isLoading: userIsLoading, data: userData } = useContext(UserContext);

    if (userError) { return <div>Retry</div>; }
    if (userIsLoading) { return <div className="w-screen h-screen"><Loading /></div>; }
    console.log(userData);

    const onSave = async () => {
        setProfileEditSubmitting(true);
        try {
            await axios.post('/api/edit/profile', { ...profileData });
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Failed to edit profile'
            });
        }
        setProfileEditSubmitting(false);
    };

    const onCancel = () => {

    };

    return (
        <div>
            <SiteNav active="/dashboard" actions={siteNavActions} />
            <SubNav url="/profile" actions={subNavActions} />
            <div className='flex flex-col items-center text-lg font-primary py-8'>
                <div className='md:w-2/3 lg:w-1/2 flex flex-col gap-4'>
                    <div className="flex gap-8 justify-between bg-white rounded-lg p-8 border-[1px] border-neutral-200">
                        <div className="flex flex-col gap-4 w-1/2">
                            <div>
                                <TextField name="Full Name" placeholder="Your full name" isMandatory={true} value={userData.name} onChange={(e: InputEvent) => setProfileData({ ...profileData, name: (e.currentTarget as HTMLInputElement).value })} />
                            </div>
                            <div>
                                <label>
                                    <div className="mb-2">Bio</div>
                                    <textarea placeholder="Your description" className="px-4 py-2 bg-neutral-100 border-neutral-300 border-[1px] border-solid rounded outline-non w-full resize-none"
                                        onChange={e => setProfileData({ ...profileData, bio: e.currentTarget.value })}
                                    ></textarea>
                                </label>
                            </div>
                            <div>
                                <TextField name="Address" placeholder="Your address" isMandatory={true}
                                    value={userData.location}
                                    onChange={(e: InputEvent) => {
                                        setProfileData({ ...profileData, location: (e.currentTarget as HTMLInputElement).value })
                                    }} />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <Button className="px-3 py-7 shadow-none text-lg bg-blue-500 border-[1px] rounded-md text-white w-24 " onClick={onSave} disabled={isProfileEditSubmitting}>
                                    Save
                                </Button>
                                <button className="px-3 py-2 bg-neutral-100 border-[1px] rounded-md border-neutral-300 w-24 text-neutral-700">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded border-[1px] border-neutral-400">
                            <img src="/images/user.jpg" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-8 border-[1px] border-neutral-200 flex flex-col gap-4">
                        <Expertise qualifications={[]} />
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

type JobInfo = {
    role: string,
    tenure: { start: number, end: number },
    company: string,
    logo: string,
};

export function Expertise({ qualifications: q }:
    {
        qualifications: Array<JobInfo>
    }) {

    return (
        <div>
            <div className="flex justify-between">
                <div>Experience</div>
                <div>
                    <button className="flex gap-4 items-center px-4 py-2 rounded bg-blue-500 text-white">
                        <TiPlus />
                        Add
                    </button>
                </div>
            </div>
            <div>
                {
                    q.map((j, i) => (
                        <div key={i}>
                            <Job info={j} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export function Job({ info }: { info: JobInfo }) {
    return (
        <div className="">
            <div>
                <div>
                    {info.role}
                </div>
                <div>
                    {info.company}
                </div>
            </div>
            <div>
                {info.tenure.start} - {info.tenure.end}
            </div>
        </div>
    )
}
