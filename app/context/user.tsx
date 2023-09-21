"use client"

import { User, UserContextTypes } from "@/app/types"
import { ID, account } from "@/libs/AppWriteClient";
import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"
import useGetProfileByUserId from "../hooks/useGetProfileByUserId";
import useCreateProfile from "../hooks/useCreateProfile";

const UserContext = createContext<UserContextTypes | null>(null);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const checkUser = async () => {
        try {
            const currentSession = await account.getSession("current");
            if(!currentSession) return;

            const promise = await account.get() as any
            const profile = await useGetProfileByUserId(promise?.$id)

            setUser({ id: promise?.$id, name: promise?.name, bio: profile?.bio, image: profile?.image});
        } catch (error) {
            setUser(null)
        }
    }

    useEffect(() => { checkUser() }, []);

    const register = async (name: string, email: string, password: string) => {
        try {
            const promise = await account.create(ID.unique(), email, password, name)
            await account.createEmailSession(email, password);

            await useCreateProfile(promise?.$id, name, String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEAFAULT_IMAGE_ID), "");
            await checkUser();
        } catch (error) {
            throw error;
        }
    }

    const login = async (email: string, password: string) => {
        try {
            await account.createEmailSession(email, password);
            await checkUser();
        } catch (error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            router.refresh();
        } catch (error) {
            
        }
    }

    return (
        <UserContext.Provider value={{ user, register, login, logout, checkUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

export const useUser = () => useContext(UserContext)