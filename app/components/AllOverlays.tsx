"use client"

import { useEffect, useState } from "react"
import { useGeneralStore } from "../stores/general"
import ClientOnly from "./ClientOnly"
import AuthOverlay from "./AuthOverlay"
import EditProfileOverlay from "./profile/EditProfileOverlay"

export default function AllOverlays() {

    let { isLoginOpen, isEditProfileOpen } = useGeneralStore()
    return (
        <>
            <ClientOnly>
                {isLoginOpen ? <AuthOverlay/> : null}
                {isEditProfileOpen ? <EditProfileOverlay /> : null} 
            </ClientOnly>
        </>
    )
}

