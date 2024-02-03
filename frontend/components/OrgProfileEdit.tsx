'use client'
import { set, useForm } from 'react-hook-form';
import { boolean, z } from 'zod';
import { } from '@/components/ui/form'
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';
import { Icons } from './icons';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from './ui/use-toast';
import { Toaster } from './ui/toaster';
import Link from 'next/link';
import axs from 'axios';
import logIn  from '@/app/api/logIn';
import _ from 'underscore';
import { useRouter } from 'next/navigation';
const axios  = axs.create({
    withCredentials: true,
});


const orgProfileSchema = z.object({
    bio: z.string(),
    url: z.string().url(),
})

// Type of the user Schema. 
type TSuserSchema = z.infer<typeof orgProfileSchema>;


////////////////////////////Main function////////////////////////
function OrgProfileEdit({ onSubmit: submitCallback } : { onSubmit : Function }) {
    
        //Router
        const router = useRouter();


    const { toast } = useToast();
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },

    } = useForm<TSuserSchema>({
        resolver: zodResolver(orgProfileSchema),
    });

    //On submission of the signup form
    const onSubmit = async (data: TSuserSchema) => {
        console.log(data)
        submitCallback();
        //Sending to the server
        // try{
        //    const response = await axios.post('http://localhost:8000/',data);
        //    if (!response.data.ok) {
        //        toast({
        //            variant: "destructive",
        //            title: "Something went wrong!",
        //         })
                
        //         return;
        //     }
        //     toast({
        //         title: "Saved seccessfully!",
        //     })
        //     const res = logIn(data);
        //     if(await res){
        //         router.push('/home');
        //     }
        //     reset();
        // }
        // catch(err){
        //     console.log(err);
        //     toast({
        //         variant: "destructive",
        //         title: "Something went wrong!",
        //         description: "Please retry.",
        //     })
        //  }
        //     router.push('/organisations/orgprofile');
        //     console.log(data);

    }

    return (
        <>
            <div className={cn("grid gap-6 w-[40%] -translate-y-16")}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1 text-center">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Textarea 
                            {...register('bio')}
                            disabled={isSubmitting}
                            placeholder='Bio'></Textarea>
                            <Input
                                {...register('url')}
                                placeholder="Url"
                                type="url"
                                disabled={isSubmitting}
                            />
                        </div>
                        <Button  type="submit" className='bg-green-500 hover:bg-green-500' disabled={isSubmitting} variant={"default"}>
                            {isSubmitting && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Save
                        </Button>
                    </div>
                </form>
                <Toaster></Toaster>
            </div>
        </>
    )
}

export default OrgProfileEdit;