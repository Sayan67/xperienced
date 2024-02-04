'use client'

import React from "react";
import OrgSiteNav from "@/components/OrgSiteNav";
import { useRecruiter } from "@/api/auth";
import { useRouter } from "next/navigation";

export default function Layout({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const {error, isLoading, data} = useRecruiter();
    if (error || (!isLoading && !data)) {
        router.push('/login/organisation');
    }
    return (
        <div>
            <OrgSiteNav active="/home" isr={true}/>
            <div>{children}</div>
        </div>
    )
}