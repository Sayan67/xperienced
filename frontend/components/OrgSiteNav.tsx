import SiteNav from "./SiteNav";

const siteNavActions = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
];

export default function OrgSiteNav({active, isr} : {active: string, isr: boolean}) {
    return (
        <SiteNav actions={siteNavActions} active={active} isr={isr}/>
    )
}