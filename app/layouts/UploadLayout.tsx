"use client"
import TopNav from "./includes/TopNav";

export default function UploadLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <div className="gb-[#F8F8F8] h-[100vh]">
                <TopNav />
                <div className=" flex justify-between mx-auto w-full px-2 max-w-[1140px]">
                    {children}
                </div>
            </div>
        </>
    )
}