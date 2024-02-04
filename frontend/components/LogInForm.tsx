"use client"
import React, { use, useState,useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { } from '@/components/ui/form'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Icons } from './icons';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from './ui/use-toast';
import { Toaster } from './ui/toaster';
import axios from 'axios';
import { useRouter,redirect } from 'next/navigation';



const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, 'Minimum length must be 4 characters.'),
})

//Type of the user Schema. 
type TSuserSchema = z.infer<typeof userSchema>;


//////////////////////////// Main function ////////////////////////
function SignUpForm() {
    const GITHUB_OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID;
    
   
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },

    } = useForm<TSuserSchema>({
        resolver: zodResolver(userSchema),
    });

    //Using next router
    const router = useRouter();


    //On form submission
    const onSubmit = async (data: TSuserSchema) => {
        //Sending to the server
        try {
            const response = await axios.post('http://localhost:8000/api/auth?type=u', data, {withCredentials: true});
            console.log(response.data);
            if (!response.data.ok) {
                toast({
                    variant: "destructive",
                    title: "Wrong Credentials",
                    description: "Check your email and password.",
                })
                
                return;
            }
            toast({
                title: "Login successfull!",
            })
            router.push('/dashboard');
        } catch (err) {
            console.log(err);
            toast({
                variant: "destructive",
                title: "Something went wrong!",
                description: "Please retry.",
            })
            
        }


    }

    return (
        <>
            <div className={cn("grid gap-6")}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1 text-center">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                {...register('email', { required: "Email is required.", })}
                                placeholder="name@example.com"
                                type="email"
                                disabled={isSubmitting}
                                required={true}
                            />
                            {errors.email && (
                                <p className='text-red-600'>{`${errors.email.message}`}</p>
                            )}
                            <Input
                                {...register('password')}
                                placeholder="password"
                                type="password"
                                disabled={isSubmitting}
                                required={true}
                            />
                            {errors.password && (
                                <p className='text-red-600'>{`${errors.password.message}`}</p>
                            )}

                        </div>
                        <Button variant={"default"} type="submit" disabled={isSubmitting}>
                            {isSubmitting && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Log in with Email
                        </Button>
                    </div>
                </form>
                <div className='flex justify-center'>

                    <p>Don't have an account?<Link className=' ml-1 text-primary font-bold' href={'/signup'}> Sign Up!</Link></p>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button variant="outline" type="button" disabled={isSubmitting} 
                >
                    {isSubmitting ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}{" "}
                    Google
                </Button>
                <Toaster></Toaster>
            </div>
        </>
    )
}

export default SignUpForm;

