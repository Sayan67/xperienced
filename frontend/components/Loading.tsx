import { Icons } from "./icons";

export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Icons.spinner className="animate-spin w-12 h-12 text-blue-500" />
        </div>
    )
}