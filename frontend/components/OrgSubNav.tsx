import SubNav from "./SubNav";

const actions = [
    {name: 'Find', href: '/organisation/find'},
    {name: 'Offers', href: '/organisation/offers'},
    {name: 'Profile', href: '/organisation/profile'},
];

export default function OrgSubNav({url, children}: {url: string, children?: React.ReactNode}) {
    return (
        <SubNav url={url} actions={actions}>{children}</SubNav>
    )
}