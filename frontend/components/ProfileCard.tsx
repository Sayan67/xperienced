import React from "react";

export default function ProfileCard(
    { data } : { data: any }
): React.ReactNode {
    return (
        <div className="border-2 border-neutral-200 rounded-full">
            <img 
                src={data.avatar || '/images/user.jpg'}
                className="rounded-full w-14 h-14 border-[1px] border-neutral-700"
            ></img>
        </div>
    )
}