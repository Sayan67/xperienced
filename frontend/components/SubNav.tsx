import { Search } from "@/app/dashboard/page"

export default function SubNav({ url, actions, children }: { url: string, actions: Array<{name: string, href: string}>, children?: React.ReactNode }) {
    return (
        <nav className="flex justify-center py-4 bg-white border-b-[1px] border-neutral-300">
            <div className='md:w-2/3 lg:w-1/2 flex gap-8 justify-between items-center'>
                <div className='flex gap-8'>
                    {
                        actions.map(({ name, href }, id) => (
                            href !== url ?
                            <a key={id} href={href} className='font-primary text-lg'>
                                {name}
                            </a>
                            :
                            <a key={id} href={href} className='font-primary text-lg font-bold'>
                                {name}
                            </a>
                        ))
                    }
                </div>
                <div className='w-full flex justify-end'>
                    {children}
                </div>
            </div>
        </nav>
    )
}