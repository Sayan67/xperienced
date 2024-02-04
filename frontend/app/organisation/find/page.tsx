import OrgSubNav from "@/components/OrgSubNav";
import SiteNav from "@/components/SiteNav";
import SubNav from "@/components/SubNav";

export default function DashboardPage() {
    const siteNavActions = [
        { name: 'Home', href: '/home' },
        { name: 'About', href: '/about' },
    ];
    return (
        <div>
            <SiteNav active="/home" actions={siteNavActions}/>
            <div className='flex-grow mb-8'><OrgSubNav url='/organisation/find'></OrgSubNav></div>
            <div className='flex flex-col items-center text-lg font-primary'>

            </div>
        </div>
    );
}