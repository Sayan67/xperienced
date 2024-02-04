import SiteNav from "./SiteNav";

const siteNavActions = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
];

export default function OrgSiteNav({active} : {active: string}) {
    return (
        <SiteNav actions={siteNavActions} active={active} />
    )
}