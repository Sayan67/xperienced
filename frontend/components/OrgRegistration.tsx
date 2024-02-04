'use client'
import { useForm } from 'react-hook-form';
import { boolean, z } from 'zod';
import { } from '@/components/ui/form'
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';
import { Icons } from './icons';
import { Label } from './ui/label';
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


const userSchema = z.object({
    name: z.string().max(20,'Maximum length can be 20 characters.'),
    email: z.string().email(),
    password: z.string().min(4, 'Minimum length must be 4 characters.'),
    confirmPassword: z.string(),
})
.refine((data) => data.confirmPassword === data.password, {
    message: "Passwords must match!",
    path: ["confirmPassword"],
})

// Type of the user Schema. 
type TSuserSchema = z.infer<typeof userSchema>;


////////////////////////////Main function////////////////////////
function SignUpForm() {

    const { toast } = useToast();
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, },

    } = useForm<TSuserSchema>({
        resolver: zodResolver(userSchema),
    });

    //Router
    const router = useRouter();

    //On submission of the signup form
    const onSubmit = async (data: TSuserSchema) => {

        //Sending to the server
        try{
           const response = await axios.post('http://localhost:8000/api/join',_.pick(data,'name','email','password'));
           if (!response.data.ok) {
               toast({
                   variant: "destructive",
                   title: "Email asscociated with another account!",
                   description: "Either you can login or use other email.",
                })
                
                return;
            }
            toast({
                title: "User Creation seccessful!",
                description: "Now you can login with your email and password.",
            })
            const res = logIn(data);
            if(await res){
                router.push('/home');
            }
            reset();
        }
        catch(err){
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
                                {...register('name', { required: "name is required.", })}
                                placeholder="Organisation name"
                                type="text"
                                disabled={isSubmitting}
                                required={true}
                            />
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
                            <Input
                                {...register('confirmPassword')}
                                placeholder="Confirm password"
                                type="password"
                                disabled={isSubmitting}
                                required={true}
                            />
                            {errors.confirmPassword && (
                                <p className='text-red-600'>{`${errors.confirmPassword.message}`}</p>
                            )}
                        </div>
                        <Button  type="submit" disabled={isSubmitting} variant={"default"}>
                            {isSubmitting && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign Up with Email
                        </Button>
                    </div>
                </form>
                <div className='flex justify-center items-center flex-col'>

                    <p>Already have an account?</p>
                    
                    <Link 
                    href='/login' 
                    className={cn(
                        buttonVariants({ variant: "secondary"}),
                        "w-full mt-2",
                      )}
                    >Login
                    </Link>
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
                <Button variant="outline" type="button" disabled={isSubmitting}>
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